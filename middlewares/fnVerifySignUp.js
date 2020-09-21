//Verify SignUp Middleware functions
//====================================

//calling in models to verify if sign in information already exists
const db = require("../models/index");
const User = db.User;
const Role = db.Role;
const fnVerifySignUp = {};


const fnCheckDuplicateEmail = (req, res, next) => {
    //check if email is already in DB
    User.findOne({
        where:{
            email: req.body.email
        }
    }).then(user => {
        if(user){
            res.status(400).send("Registration failed! -> Email address entered is already in use.");
            return;
        }
        //calling sign up function from controller
        next();
    });
}

const fnCheckRoles = (req, res, next) => {
    Role.findAll({
        raw: true,
    }).then(roles => {
        //verifying if new user's role is valid for our app
        if( !roles.map( (role) => { return role.name; } ).includes(req.body.role.toUpperCase()) ){
            res.status(400).send("Registration failed! -> Selected Role is not valid. Contact Admin for support.");
            return;
        }
        //calling sign up function from controller
        next();
    });
}

//adding methods to object
fnVerifySignUp["fnCheckDuplicateEmail"] = fnCheckDuplicateEmail;
fnVerifySignUp["fnCheckRoles"] = fnCheckRoles;

module.exports = fnVerifySignUp;