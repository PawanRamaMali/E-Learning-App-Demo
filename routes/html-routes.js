// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require('../models')

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.handlebars
  app.get("/", function(req, res) {
      res.render('index')
    //res.sendFile(path.join(__dirname,'../public/index.html'));
  });

  // course route loads course.handlebars, requests Course data from DB to
  // populate the applicable courses
  app.get("/course", function(req, res) {
    // var cleanCourse = []
    // db.Course.findAll({}).then(function(data){
    //   //console.log('data from db!!!', data)
    //   for (let i = 0; i < data.length; i++) {
    //     cleanCourse.push(data[i].dataValues)
        
    //   }
    //   console.log('cleaner courseddd', cleanCourse)
    //   var hbsObject = {
    //     courses: cleanCourse
    //   }
    // })
     res.render('course');
    //res.render('students');
  })

  // student-roster route loads student-roster.handlebars
  app.get("/student-roster", function(req, res) {
    // var cleanCourse = []
    // db.Course.findAll({}).then(function(data){
    //   //console.log('data from db!!!', data)
    //   for (let i = 0; i < data.length; i++) {
    //     cleanCourse.push(data[i].dataValues)
        
    //   }
    //   console.log('cleaner courseddd', cleanCourse)
    //   var hbsObject = {
    //     courses: cleanCourse
    //   }
      
    // })
    res.render('student-roster')
  })

//instructors route loads instructors.handlebars file
app.get("/instructors", function(req, res) {
  res.render('instructors')
});//

//instructor-course route loads instructor-course.handlebars file
app.get("/instructor-courses", function(req, res) {
  res.render('instructor-courses')
});

//students route loads students.handlebars file
app.get("/students", function(req, res) {
  res.render('students')
});


//lessons route loads lessons.handlebars file
app.get("/lessons", function(req, res) {
  // var cleanCourse = []
  //   db.Course.findAll({}).then(function(data){
  //     //console.log('data from db!!!', data)
  //     for (let i = 0; i < data.length; i++) {
  //       cleanCourse.push(data[i].dataValues)
        
  //     }
  //     console.log('cleaner courses!', cleanCourse)
  //     var hbsObject = {
  //       courses: cleanCourse
  //     }
  res.render('lessons')
});

 //save new student route


};