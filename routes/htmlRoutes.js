var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/index", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  //Load landing page
  app.get("/", function(req, res) {
    res.render("landing");
  });

  app.get("/teachers", function(req, res) {
    db.Teacher.findAll({}).then(function(dbTeachers) {
      res.render("newTeacher", {
        teacher: dbTeachers
      });
    });
  });

  app.get("/students", function(req, res) {
    db.Student.findAll({}).then(function(dbStudents) {
      res.render("newStudent", {
        students: dbStudents
      });
    });
  });

  app.get("/announcements", function(req, res) {
    res.render("teacherAnnouncement");
  });

  app.get("/events", function(req, res) {
    res.render("teacherEvents");
  });

  // Load teacher page and pass in a teacher by id
  app.get("/student/:id", function(req, res) {
    db.Student.findOne({ where: { id: req.params.id } }).then(function(
      dbStudents
    ) {
      res.render("individualStudent", {
        student: dbStudents
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
