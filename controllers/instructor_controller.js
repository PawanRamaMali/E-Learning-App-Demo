//the instructor controller handles all DB transactions
//=============================================================
const db = require("../models/index");
//calling symbol based operators from Sequelize
const Op = db.Sequelize.Op;

//INSTRUCTOR COURSES
//==================================================
exports.instructorCourses = (req, res) => {
    //retrieve Courses list from DB
    console.log(
        `${
          process.env.APP_ENV === "development"
            ? "===== Returning Instructor's Courses ====="
            : ""
        }`
      );

      db.Course.findAll({
        where: {
            user_id: req.userId //this id comes from middleware after decoding JWT
        },
        attributes: ["id","course_name", "subject", "createdAt", "updatedAt"],
        include: [{
            model: db.User,
            attributes: ["first_name", "last_name", "email"],
            through: {
                model: db.Users_Courses,
                attributes: ["isCompleted", "completedAt"],
            }
        }]
    }).then((courseData) => {
        if (courseData){
            res.status(200).json({
                "data": courseData
            });
        }
    }).catch((err) => {
        res.status(500).send(`Error Retrieving Course information -> ${err}`);
    });
}

//COURSE ADDITION
//==================================================
exports.addCourse = (req, res) => {
    console.log(
        `${
          process.env.APP_ENV === "development"
            ? "===== Adding New Instructor's Courses ====="
            : ""
        }`
      );
    //using Course model to save information
  db.Course.create({
    course_name: req.body.course_name.toUpperCase(),
    subject: req.body.subject.toUpperCase(),
    user_id: req.userId,
  })
    .then(() => {
        db.Course.findAll({
            where: {
                user_id: req.userId //this id comes from middleware after decoding JWT
            },
            attributes: ["id","course_name", "subject", "createdAt", "updatedAt"],
            include: [{
                model: db.User,
                attributes: ["first_name", "last_name", "email"],
                through: {
                    model: db.Users_Courses,
                    attributes: ["isCompleted", "completedAt"],
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
    })
    .catch((err) => {
      res.status(500).send("Fail! Error -> " + err);
    });
}

//COURSE UPDATE
//==================================================
exports.updCourse = (req, res) => {
    console.log(
        `${
          process.env.APP_ENV === "development"
            ? "===== Updating Courses ====="
            : ""
        }`
      );
    //course id will be past in route
    db.Course.update({
            course_name: req.body.course_name,
            subject: req.body.subject
        },
        {
            where: {
                id: req.body.course_id
            }
        }
    )
    .then( (rowsUpdated) => {
        if(rowsUpdated){
            db.Course.findOne({
                where: {
                    id: req.body.course_id //this id comes from middleware after decoding JWT
                },
                attributes: ["id","course_name", "subject", "createdAt", "updatedAt"],
                include: [{
                    model: db.User,
                    attributes: ["first_name", "last_name", "email"],
                    through: {
                        model: db.Users_Courses,
                        attributes: ["isCompleted", "completedAt"],
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
    } )
}

// Lesson Update
//==================================================
exports.updLesson = (req, res) => {
    console.log(
      `${
        process.env.APP_ENV === "development"
          ? "===== Updating Lesson ====="
          : ""
      }`
    )
    //course id will be passed in route
    db.Lesson.update({
      name: req.body.lesson_name,
      url: req.body.url
    },
    {
      where: {
        id: req.body.lesson_id
      }
    })
    .then( (rowsUpdated) => {
      if(rowsUpdated){
        db.lesson.findOne({
          where: {
            id: req.body.lesson_id //id comes from middleware after decoding JWT
          },
          attributes: ["id", "name", "url", "createdAt", "updatedAt"],
          include: [{
            model: db.course,
            attributes: ["id", "course_name", "subject", "createdAt", "updatedAt"]
          }]
        }).then((lessonData) => {
          if (lessonData){
            res.status(200).json({
              "data": courseData,
            })
          }
        }).catch((err) => {
          res.status(500).send(`Error Retrieving Course Information -> ${err}`)
        })
      }
    })
  }
  
//Delete Lesson
//==================================================
  exports.deleteLsn = (req, res) => {
    //logging into console in dev env
    console.log(
      `${
        process.env.APP_ENV === "developement"
          ? "===== Delete Lesson ===="
          : ""
      }`
    )
  
    db.Lesson.destroy({
      where: {
        id: req.body.lesson_id
      }
    }).then((lesson) => {
      if (lesson) {
        res.status(200).send("Lesson Delteted")
      }
    }).catch((err) => {
      res.status(500).send(`Error deleting lesson -> ${err}`)
    })
  }
  
//Delete Course
//==================================================
  exports.deleteCrs = (req, res) => {
    //logging into console in dev env
    console.log(
      `${
        process.env.APP_ENV === "developement"
          ? "===== Delete Course ===="
          : ""
      }`
    )
  
    db.Course.destroy({
      where: {
        id: req.params.course_id
      }
    }).then((course) => {
      if (course) {
        res.status(200).send("Course Deleted")
      }
    }).catch((err) => {
      res.status(500).send(`Error Deleting user -> ${err}`)
    })
  }

//GETTING LESSONS
exports.getLessonsByCourse = (req, res) => {
    console.log(
        `${
          process.env.APP_ENV === "development"
            ? "===== Getting Lessons by Course Name ====="
            : ""
        }`
      );

      db.Lesson.findAll({
          where: {
              CourseId: req.params.id
          },
          include: [{
            model: db.Course,
            attributes: ["id", "course_name", "subject", "createdAt", "updatedAt"]
          }]
      })
      .then( (lessons) => {
          if(lessons){
            res.status(200).json({
            "data": lessons,
        })}
      } )
      .catch((err) => {
        res.status(500).send(`Error Retrieving Lesson information -> ${err}`);
    });
}

//ADDING LESSON
exports.addLesson = (req, res) => {
    console.log(
        `${
          process.env.APP_ENV === "development"
            ? "===== Adding New Course Lesson ====="
            : ""
        }`
      );
    //using Course model to save information
  db.Lesson.create({
    name: req.body.lesson_name.toUpperCase(),
    url: req.body.url.toUpperCase(),
    CourseId: req.body.course_id,
  })
  .then( () => {
        db.Lesson.findAll({
            where: {
                CourseId: req.body.course_id
            }
        })
        .then( (lessons) => {
            if(lessons){
            res.status(200).json({
            "data": lessons,
        })}
        } )
        .catch((err) => {
        res.status(500).send(`Error Retrieving Lesson information -> ${err}`);
    });
  })
}
