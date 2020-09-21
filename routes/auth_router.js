//Importing helping functions from utils
//===========================================
const VerifySignUp = require("../middlewares/fnVerifySignUp");
const JwtTokenValidator = require("../middlewares/fnVerifyJwtToken");

// auth routes
module.exports = (app) => {
    //including controller here to be exported
    const authController = require("../controllers/auth_controller");

    //defining route for signup
    app.post("/api/auth/signup", [VerifySignUp.fnCheckDuplicateEmail, VerifySignUp.fnCheckRoles], authController.signup);

    //defining route for signin
    app.post("/api/auth/signin", authController.signin)

    //Defining test routes
    app.get('/api/test/user', JwtTokenValidator.fnVerifyToken, authController.userContent);

    //token validation only
    app.get("/api/auth/token", JwtTokenValidator.fnVerifyToken, authController.tokenValidation);


}
