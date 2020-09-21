//student controller 
const db = require("../models/index");

const Op = db.Sequelize.Op;

//STUDENT ASSIGNED COURSES
exports.Users_Courses = (req, res) => {
    console.log(
        `${
          process.env.APP_ENV === "development"
            ? "===== Returning Student Courses ====="
            : ""
        }`
      );

      db.User.findOne({
        where: {
            id: req.userId 
        },
        attributes: ["id", "first_name", "last_name", "createdAt", "updatedAt"],
        include: [{
            model: db.Course,
            attributes: ["course_name", "subject", "user_id"],
            through: {
                model: db.Users_Courses,
                attributes: ["courseId", "userId", "isCompleted", "completedAt"],
            }
        }]
    }).then((courseData) => {
        if (courseData){
            res.status(200).json({
                "data": courseData,
            })
        }
    }).catch((err) => {
        res.status(500).send(`Error Retrieving Course information -> ${err}`);
    });
}

//All STUDENT ASSINGED LESSONS

exports.allUsersLessons = (req, res) => {
    console.log(
        `${
          process.env.APP_ENV === "development"
            ? "===== Returning User Lessons ====="
            : ""
        }`
      );

      db.Lesson.findAll({
          where: {
              CourseId: req.params.id
          },
          include: [{
              model: db.Course,
            //   model: db.Lesson,
              attributes: ["id", "course_name", "subject", "createdAt", "updatedAt"]
          }]
      })
      .then( (lessons) => {
          if(lessons) {
              res.status(200).json({
                  "data": lessons,
              })
          }
      })
      .catch((err) => {
          res.status(500).send(`Retrieving Lesson information -> ${err}`)
      })
}

//ONE STUDENT LESSON
exports.userLesson = (req, res) => {
    console.log(
        `${
            process.env.APP_ENV === "development"
            ? "===== Gettring Lesson by ID ====="
            : ""
        }`
    );

    db.Lesson.findOne({
        where: {
            id: req.params.lesson_id
        },
        include: db.Lesson,
        // include: db.Course,
        attributes: ["id", "course_name", "subject", "createdAt", "updatedAt"]
    })
    .then( (lesson) => {
        if (lesson) {
            res.status(200).json({
                "data": lesson
            })
        }
    })
    .catch((err) => {
        res.status(500).send(`Error Retrieving Lesson information -> ${err}`)
    })
}