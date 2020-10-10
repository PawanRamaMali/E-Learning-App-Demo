const db = require("../models/index");

// View all instructors
//==================================================
exports.viewInstuctors = (req, res) => {
    console.log(
        `${
            process.env.APP_ENV === "development"
            ? "===== Getting All Instructors By Id ====="
            : ""
        }`
    );


    db.User.findAll({
        attributes : ["id", "first_name", "last_name", "email", "confirmed", "active"],
        include: [{
            model: db.Role,
            where: {id: 2}
        }]
    }).then((instructorData) => {
        if (instructorData){
            res.status(200).json({
                "data": instructorData
            })
        }
    }).catch((err) => {
        res.status(500).send(`Error Retrieving Instructor information -> ${err}`)
    })
}

// Delete Instructors
//==================================================
exports.deleteInstructors = (req, res) => {
    console.log(
        `${
          process.env.APP_ENV === "developement"
            ? "===== Delete Instructor ===="
            : ""
        }`
      )

      db.User.destroy({
          where: {
            id: req.query.id
          },
        attributes : ["id", "first_name", "last_name", "email", "confirmed", "active"],
        include: [{
            model: db.Role,
            where: {id: 2}
        }]
    }).then((instructorData) => {
        if (instructorData){
            res.status(200).json({
                "data": "Instructor Deleted"
        })
        }
    }).catch((err) => {
        res.status(500).send(`Error Retrieving Instructor information -> ${err}`)
      })
}

// View all students
//==================================================
exports.viewStudents = (req, res) => {
    console.log(
        `${
            process.env.APP_ENV === "development"
            ? "===== Getting All Students By Id ====="
            : ""
        }`
    );


    db.User.findAll({
        attributes : ["id", "first_name", "last_name", "email", "confirmed", "active"],
        include: [{
            model: db.Role,
            where: {id: 1}
        }]
    }).then((studentData) => {
        if (studentData){
            res.status(200).json({
                "data": studentData
            })
        }
    }).catch((err) => {
        res.status(500).send(`Error Retrieving Student information -> ${err}`)
    })
}

// Delete Students
//==================================================
exports.deleteStudent = (req, res) => {
    console.log(
        `${
          process.env.APP_ENV === "developement"
            ? "===== Delete Student ===="
            : ""
        }`
      )

      db.User.destroy({
          where: {
            id: req.query.id
          },
        attributes : ["id", "first_name", "last_name", "email", "confirmed", "active"],
        include: [{
            model: db.Role,
            where: {id: 1}
        }]
    }).then((studentData) => {
        if (studentData){
            res.status(200).json({
                "data": "Student Deleted"
        })
        }
    }).catch((err) => {
        res.status(500).send(`Error Retrieving Student information -> ${err}`)
      })
}


// Activate User
//==================================================
exports.activateUser = (req, res) => {
    console.log(
        `${
          process.env.APP_ENV === "developement"
            ? "===== User Student ===="
            : ""
        }`
      )

      db.User.update({
          active: true
      },{
          where: {
              id: req.query.id,
              active: false
          }
        })
      .then((userData) => {
        if (userData){
            res.status(200).json({
                "data": "User Activated"
        })
        }
    }).catch((err) => {
        res.status(500).send(`Error Activating User -> ${err}`)
      })
}

// Dectivate User
//==================================================
exports.deactivateUser = (req, res) => {
    console.log(
        `${
          process.env.APP_ENV === "developement"
            ? "===== Deactivate User ===="
            : ""
        }`
      )

      db.User.update({
          active: false
      },{
          where: {
              id: req.query.id,
              active: true
          }
        })
      .then((userData) => {
        if (userData){
            res.status(200).json({
                "data": "User Dectivated"
        })
        }
    }).catch((err) => {
        res.status(500).send(`Error Dectivating User -> ${err}`)
      })
}