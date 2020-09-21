//importing JWT Validator
const JwtTokenValidator = require("../middlewares/fnVerifyJwtToken");
//importing user controller for redirection
const userController = require("../controllers/user_controller");
const path = require('path')

//router definition.
module.exports = (app) => {
    //defining default header properties for responses
    //including x-access-token and origin for CORS
   
    //importing user controller for redirection
    const userController = require("../controllers/user_controller");
    const instructorController = require("../controllers/instructor_controller");
    const studentController = require("../controllers/student_controller");

    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    //Student Route
    app.get("/api/user/student", [JwtTokenValidator.fnVerifyToken, JwtTokenValidator.isStudent], userController.studentPortal)

    // Student view courses
    app.get("/api/user/student/courses", [JwtTokenValidator.fnVerifyToken, JwtTokenValidator.isStudent], studentController.Users_Courses)

    // Student view lessons
    app.get("/api/user/student/courses/lessons", [JwtTokenValidator.fnVerifyToken, JwtTokenValidator.isStudent], studentController.allUsersLessons)

    // Student view specific lessons
    app.get("/api/user/student/courses/lessons/:id", [JwtTokenValidator.fnVerifyToken, JwtTokenValidator.isStudent], studentController.userLesson)
    
    //Intructor Route
    app.get("/api/user/instructor", [JwtTokenValidator.fnVerifyToken, JwtTokenValidator.isInstructor], userController.instructorPortal);

    //Instructor course list
    app.get("/api/user/instructor/courses", [JwtTokenValidator.fnVerifyToken, JwtTokenValidator.isInstructor], instructorController.instructorCourses);

    //Instructor Course creation route
    app.post("/api/user/instructor/courses", [JwtTokenValidator.fnVerifyToken, JwtTokenValidator.isInstructor], instructorController.addCourse);

    //Instructor Course update route
    app.post("/api/user/instructor/courses/update", [JwtTokenValidator.fnVerifyToken, JwtTokenValidator.isInstructor], instructorController.updCourse);

    //route to update lesson
    app.post("/api/user/instructor/lessons/update", [JwtTokenValidator.fnVerifyToken, JwtTokenValidator.isInstructor], instructorController.updCourse)

    //route to delete course
    app.delete("/api/user/instructor/courses/delete", [JwtTokenValidator.fnVerifyToken, JwtTokenValidator.isInstructor], instructorController.deleteCrs)

    //route to delete lesson
    app.delete("/api/user/instructor/lessons/delete", [JwtTokenValidator.fnVerifyToken, JwtTokenValidator.isInstructor], instructorController.deleteLsn)

    //Instructor Read Lessons route
    app.get("/api/user/instructor/lessons/:id", [JwtTokenValidator.fnVerifyToken, JwtTokenValidator.isInstructor], instructorController.getLessonsByCourse);

    //Instructor Create Lessons route
    app.post("/api/user/instructor/lessons", [JwtTokenValidator.fnVerifyToken, JwtTokenValidator.isInstructor], instructorController.addLesson);
}
