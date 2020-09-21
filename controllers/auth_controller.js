//Verify SignIn & Role verification Middleware functions
//====================================
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs"); //to enconde password sent by user and compare with value in DB
//calling in models and jwt secret to verify if sign in information already exists
// const crypto = require("crypto")
const db = require("../models/index");
const config = require("../config/config.json"); // only in case there is no .env defined with SECRET
const nodemailer = require("nodemailer"); //pkg for sending registration email
const User = db.User;
const Role = db.Role;
const Course = db.Course;
const SECRET = process.env.SECRET || config.development.secret;
//calling symbol based operators from Sequelize
const Op = db.Sequelize.Op;

//auth controller Middleware functions
exports.signup = (req, res) => {
  //saving new user to DB in case verification passed
  //logging to console if in dev env
  console.log(
    `${
      process.env.APP_ENV === "development"
        ? "===== Adding New User to DB ====="
        : ""
    }`
  );

  //using User model to save information
  User.create({
    first_name: req.body.first_name.toUpperCase(),
    last_name: req.body.last_name.toUpperCase(),
    email: req.body.email.toUpperCase(),
    password: bcrypt.hashSync(req.body.password, 10),
    confirmed: false,
  })
    .then((user) => {
      Role.findAll({
        where: {
          name: {
            [Op.eq]: req.body.role,
          },
        },
      })
        .then((roles) => {
          user.setRoles(roles).then( () => {
            Course.findOne({
              where: {
                id: req.body.crsid
              }
            }).then((course) => {
              user.setCourses(course).then( () => {
                //Send registration email.
                //output string html
                const emailHtml = `
                <h3>Hello, ${req.body.first_name.toUpperCase()}</h3>
                <p>One of your Instructors has created an account for our E-Learning App: POD.</p>
                <p>Below you can find your account details:</p>
                <ul>
                  <li>Email: ${req.body.email}</li>
                  <li>Password: ${req.body.password}</li>
                </ul>
                <p>Link to the Learning App: <a href="http://localhost:8000"></a></p>
                <h4>Happy Learning!</h4>
                <p>POD Learning App Support Team</p>
                `;
                //NODE MAILER SECTION
                //===========================
                // create reusable transporter object using the SMTP transport
                let transporter = nodemailer.createTransport({
                  host: "gator4144.hostgator.com",
                  port: 465,
                  secure: true, 
                  auth: {
                    user: "test@nxtlevelbeauty.com", // user
                    pass: process.env.EMAIL_PASS || config.development.secret, // password
                  },
                  tls: {
                    rejectUnauthorized: false
                  }
                });

                //setup email data
                let mailOptions = {
                  from: '"POD E-Learning" <test@nxtlevelbeauty.com>', // sender address
                  to: req.body.email, // list of receivers
                  subject: "Welcome to POD E-Learning", // Subject line
                  text: "Welcome to POD E-Learning", // plain text body
                  html: emailHtml, // html body
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                  if(error) return console.log(error);
                  console.log("Message sent: %s", info.messageId);
                  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                  res.status(200).send("User registered successfully!");
                });
                //===========================
              });
              })
            })
        })
        .catch((err) => {
          res.status(500).send("Error -> " + err);
        });
    })
    .catch((err) => {
      res.status(500).send("Fail! Error -> " + err);
    });
};


exports.signin = (req, res) => {
  //logging to console if in dev env
  console.log(
    `${
      process.env.APP_ENV === "development"
        ? "===== User Sign in ====="
        : ""
    }`
  );

  User.findOne({
    where: {
      email: req.body.email,
      //include: Role
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send("Login failed. User Not Found!");
      }

      const isPasswordValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!isPasswordValid) {
        return res
          .status(401)
          .send({
            auth: false,
            accessToken: null,
            reason: "Login failed. Invalid Password!",
          });
      }
      //if user exist and password is valid, return access token
      const jwToken = jwt.sign({ id: user.id }, SECRET, {
        expiresIn: 86400, // expires in 24 hours
      });
      //getting user role
      user.getRoles().then((role) => {
        res.status(200).send({ auth: true, role: role[0].name, fname: user.first_name, accessToken: jwToken });
      })
      .catch( (err) => {
        res.status(500).send("Error Verifying Role -> " + err);
      });
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
}

//testing routes
//===========================
exports.userContent = (req, res) => {
    //logging to console if in dev env
  console.log(
    `${
      process.env.APP_ENV === "development"
        ? "===== Returning Logged In user's content ====="
        : ""
    }`
  );

  User.findOne({
      where: {
          id: req.userId //this id comes from middleware after decoding JWT
      },
      attributes: ["first_name", "last_name", "email", "confirmed"],
      include: [{
          model: Role,
          attributes: ["name"],
          through: {
              attributes: ["userId", "roleId"],
          }
      }]
  }).then((user) => {
      if (user){
          res.status(200).json({
              "message": "User Information",
              "user": user,
          })
      }
  }).catch((err) => {
      res.status(500).send(`Error Retrieving user's information -> ${err}`);
  });
}

exports.tokenValidation = (req, res) => {
  if (req.userId) res.status(200).json({"auth": true});
} 