var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../models');

var key = db.User.findOne({
  where: {
    role: 1
  }
}).then(function(dbAdmin) {
  console.log(dbAdmin.key);
  return dbAdmin.key;
});

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(
  new LocalStrategy(
    // Our user will sign in using an email, rather than a "username"
    {
      usernameField: 'email',
      passReqToCallback: true
    },
    function(req, email, password, done) {
      // if (key === req.body.key) {
      //   return done(null, )
      // } else {
      //   return done(null, false, {
      //     message: 'Incorrect key.'
      //   });
      // }

      // When a user tries to sign in this code runs
      db.User.findOne({
        where: {
          email: email
          // key: key
        }
      }).then(function(dbUser) {
        //If there's no user with given key
        // if (!dbUser) {
        //   return done(null, false, {
        //     message: 'Incorrect Key.'
        //   });
        // }
        // If there's no user with the given email
        if (!dbUser) {
          return done(null, false, {
            message: 'Incorrect email.'
          });
        }
        // else if (!dbUser.validEmail(email)) {
        //   return done(null, false, {
        //     message: 'Incorrect email.'
        //   });
        // }
        // If there is a user with the given email, but the password the user gives us is incorrect
        else if (!dbUser.validPassword(password)) {
          return done(null, false, {
            message: 'Incorrect password.'
          });
        }
        // If none of the above, return the user
        // console.log('exited passport for login');
        // console.log(req.body.fname);
        return done(null, dbUser);
      });
    }
  )
);

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
