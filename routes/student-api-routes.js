var db = require("../models");

module.exports = function(app) {
  // Get all teachers
  app.get("/api/students", function(req, res) {
    var query = {};
    if (req.query.author_id) {
      query.AuthorId = req.query.author_id;
    }
    // Sequelize query to find all teachers, followed by a promise
    db.Student.findAll({
      where: query
    }).then(function(dbStudent) {
      res.json(dbStudent);
    });
  });

  // Create a new example
  app.post("/api/students", function(req, res) {
    db.Student.create(req.body).then(function(dbStudent) {
      res.json(dbStudent);
    });
  });

  // Delete an example by id
  app.delete("/api/students/:id", function(req, res) {
    db.Student.destroy({ where: { id: req.params.id } }).then(function(
      dbStudent
    ) {
      res.json(dbStudent);
    });
  });
};

// PUT route for updating posts
app.put("/api/students", function(req, res) {
  db.Student.update(req.body, {
    where: {
      id: req.body.id
    }
  }).then(function(dbStudent) {
    res.json(dbStudent);
  });
});
