var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/teachers", function(req, res) {
    db.Teacher.findAll({}).then(function(dbTeacher) {
      res.json(dbTeacher);
    });
  });

  // Create a new student
  app.post("/api/teachers", function(req, res) {
    db.Teacher.create(req.body).then(function(dbTeacher) {
      res.json(dbTeacher);
    });
  });

  // Delete an student by id
  app.delete("/api/teachers/:id", function(req, res) {
    db.Teacher.destroy({ where: { id: req.params.id } }).then(function(
      dbTeacher
    ) {
      res.json(dbTeacher);
    });
  });
};

// PUT route for updating students
app.put("/api/teachers", function(req, res) {
  db.Teacher.update(req.body, {
    where: {
      id: req.body.id
    }
  }).then(function(dbTeacher) {
    res.json(dbTeacher);
  });
});
