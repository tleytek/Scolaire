// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
var bcrypt = require('bcrypt-nodejs');
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false //set  "true" later...
    },
    key: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    validated: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    }
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  //validEmail - custom method for User model.  Will check if email is entered in db.
  User.prototype.validEmail = function(email) {
    if (password == this.password) {
      return true;
    }
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.hook('beforeCreate', function(user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(12),
      null
    );
  });

  // User.hook('afterCreate', function(user) {
  //   if (user.role === 1) {
  //     user.password = bcrypt.hashSync(
  //       user.password,
  //       bcrypt.genSaltSync(12),
  //       null
  //     );
  //     console.log('User IS admin, so needed to bcrypt AFTER');
  //   } else {
  //     console.log('User not admin, so no need to bcrypt AFTER');
  //   }
  // });
  return User;
};
