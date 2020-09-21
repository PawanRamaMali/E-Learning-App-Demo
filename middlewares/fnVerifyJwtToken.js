//Verify SignIn & Role verification Middleware functions
//====================================
const jwt = require("jsonwebtoken");
//calling in models to verify if sign in information already exists
const db = require("../models/index");
const config = require("../config/config.json");
const User = db.User;
const Role = db.Role;
const SECRET = process.env.SECRET || config.development.secret;
const JwtTokenValidator = {};

const fnVerifyToken = (req, res, next) => {
  //retrieve token from request header
  let jwtoken = req.headers["x-access-token"];

  if (!jwtoken) {
    //permission denied. token can't be verified
    return res.status(403).send({
      auth: false,
      message: "No access-token provided",
    });
  }

  //verify token
  jwt.verify(jwtoken, SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send({
        auth: false,
        message: "Token Authentication Failed. Error -> " + err,
      });
    }
    req.userId = decoded.id;
    console.log("userId " + req.userId);
    next();
  });
};

const isInstructor = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    //get the role
    user.getRoles().then((role) => {
      if (role[0].name === "INSTRUCTOR") {
        next();
        //adding return here to skip below code when user role === INSTRUCTOR
        return;
      }
      //if not INSTRUCTOR
      res.status(403).send({
        message: "Access Denied. -- INSTRUCTOR -- Permissions Required!",
      });
      return;
    });
  });
};

const isStudent = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    //get the role
    user.getRoles().then((role) => {
      if (role[0].name === "STUDENT") {
        next();
        //adding return here to skip below code when user role === STUDENT
        return;
      }
      //if not STUDENT
      res.status(403).send({
        message: "Access Denied. -- STUDENT -- Permissions Required!",
      });
      return;
    });
  });
};

JwtTokenValidator["fnVerifyToken"] = fnVerifyToken;
JwtTokenValidator["isInstructor"] = isInstructor;
JwtTokenValidator["isStudent"] = isStudent;

module.exports = JwtTokenValidator;
