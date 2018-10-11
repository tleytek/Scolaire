// Requiring our models and passport as we've configured it
var db = require('../models');
var passport = require('../config/passport');
var rand = require('random-key');

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post('/api/login', passport.authenticate('local'), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    console.log(res.body);
    res.json('/members');
  });

  // Route for signing up a user. The user's password is automatically0 hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post('/api/signup', function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      fname: req.body.fname,
      lname: req.body.lname,
      role: req.body.role,
      // key: req.body.key,
      validated: false
    })
      .then(function() {
        res.redirect(307, '/api/login');
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
        res.status(422).json(err.errors[0].message);
      });
  });

  //POST route for admin generated key
  app.post('/api/members', function(req, res) {
    //store in db, then return
    var key = rand.generateDigits(9);
    var genKey = { key: key };
    //ALWAYS need VALUE, then WHERE, then anything else...
    var where = {
      where: {
        id: 1
      }
    };
    db.User.update(genKey, where).then(function() {
      console.log('Update Key to User: admin db');
    });
    res.json(genKey);
  });

  //POST route for teacher entered key
  app.post('/api/verify', function(req, res) {
    console.log('enter key:' + req.body);
    var enterKey = { key: req.body };
    var deleteKey = { key: null };
    var validatedTeacher = { validated: true };
    var whereKey = {
      where: {
        id: 1
      }
    };
    var whereKeyTeacher = {
      where: {
        role: 2
      }
    };
    db.User.findOne(enterKey, whereKey).then(function(result) {
      if (result) {
        console.log("It's a Match!");
        db.User.update(deleteKey, whereKey).then(function(resultAdmin) {
          console.log('Key deleted from admin');
        });
        db.User.update(validatedTeacher, whereKeyTeacher).then(function(
          resultTeacher
        ) {
          console.log('Teacher validated!');
          res.json(validatedTeacher);
        });
      } else {
        console.log('NOT a Match!');
      }
    });
  });

  // Route for logging user out
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // Route for getting some data about our user to be used client side
  app.get('/api/user_data', function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        fname: req.user.fname,
        validated: req.user.validated,
        key: req.user.key,
        role: req.body.role
      });
    }
  });
};
