var db = require("../models");

module.exports = function(app) {
  //Get all Teachers
  app.get("/api/teachers", function(req, res) {
    db.Teacher.findAll({}).then(function(dbTeacher) {
      res.json(dbTeacher);
    });
  });

  // Create a new teacher
  app.post("/api/teachers", function(req, res) {
    db.Teacher.create(req.body).then(function(dbTeacher) {
      res.json(dbTeacher);
    });
  });

  // Delete an teacher by id
  app.delete("/api/teachers/:id", function(req, res) {
    db.Teacher.destroy({ where: { id: req.params.id } }).then(function(
      dbTeacher
    ) {
      res.json(dbTeacher);
    });
  });

  // PUT route for updating teachers
  app.put("/api/teachers", function(req, res) {
    db.Teacher.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbTeacher) {
      res.json(dbTeacher);
    });
  });

  // Get all students
  app.get("/api/students", function(req, res) {
    var query = {};
    if (req.query.author_id) {
      query.AuthorId = req.query.author_id;
    }
    // Sequelize query to find all students, followed by a promise
    db.Student.findAll({
      where: query
    }).then(function(dbStudent) {
      res.json(dbStudent);
    });
  });

  // Create a new student
  app.post("/api/students", function(req, res) {
    db.Student.create(req.body).then(function(dbStudent) {
      res.json(dbStudent);
    });
  });

  // Delete an student by id
  app.delete("/api/students/:id", function(req, res) {
    db.Student.destroy({ where: { id: req.params.id } }).then(function(
      dbStudent
    ) {
      res.json(dbStudent);
    });
  });

  // PUT route for updating students
  app.put("/api/students", function(req, res) {
    db.Student.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbStudent) {
      res.json(dbStudent);
    });
  });
};
