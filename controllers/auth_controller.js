//Verify SignIn & Role verification Middleware functions
//====================================
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); //to enconde password sent by user and compare with value in DB
//calling in models and jwt secret to verify if sign in information already exists
// const crypto = require("crypto")
const db = require("../models/index");
const config = require("../config/config.json"); // only in case there is no .env defined with SECRET
const tempPass = require("../utils/temp_pass_gen"); // function tp generate temp password
const emailTemplates = require("../utils/email_templates");
const mailer = require("../utils/app_mailer");
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
    password: bcrypt.hashSync(tempPass(), 10),
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
              user.setCourses(course).then(async () => {
                //Define registration email template
                const regEmailTemplate = emailTemplates.registration_template({
                  first_name: req.body.first_name,
                  email: req.body.email,
                  token: generateJWToken({
                          id: user.dataValues.id,
                          fname: req.body.first_name
                          }, 86400)
                });
                //send email
                const mailerResponse = await mailer(req.body.email, regEmailTemplate);
                if(!mailerResponse.sent) {res.status(500).send("Error sending registration email")}
                else {res.status(200).send("User registered successfully!");}
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
      const jwToken = generateJWToken({id: user.id}, 86400);
      
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

//password reset routes
//===========================
exports.passwordReset = (req, res) => {
  //logging to console if in dev env
console.log(
  `${
    process.env.APP_ENV === "development"
      ? "===== Password Reset ====="
      : ""
  }`
);

//encrypting new password
const newPassEnc = bcrypt.hashSync(req.body.password, 10);
User.findOne({
    where: {
        id: req.userId //this id comes from middleware after decoding JWT
    }
}).then((user) => {
    if (user){
      user.update({password: newPassEnc}).then(() => {
        console.log("password changed");
        res.status(200).json({
          "msg": "Password Updated"
        })
      })
    }
    else{
      res.status(403).json({
        "msg": "User not found"
      })
    }
}).catch((err) => {
    res.status(500).send(`Error Updating user's password -> ${err}`);
});
}

exports.tokenValidation = (req, res) => {
  if (req.userId) res.status(200).json({"auth": true, "userId": req.userId});
} 

/**
 * jwToken Generator Function
 * Receives Payload as object and
 * expiration time in seconds
 */
const generateJWToken = (payload, expTime) => {
  return jwt.sign(payload, SECRET, {
    expiresIn: expTime,
  });
}