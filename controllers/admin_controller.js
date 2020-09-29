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
            id: req.body.id
          },
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
