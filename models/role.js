// Creating our Role model
module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
    // The password CAN be null
    roleType: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });

  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  // User.prototype.validPassword = function(password) {
  //   return bcrypt.compareSync(password, this.password);
  // };

  //Role has many user(s)
  Role.associate = function(models) {
    Role.hasMany(models.User, {});
  };

  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  // User.hook('beforeCreate', function(user) {
  //   user.password = bcrypt.hashSync(
  //     user.password,
  //     bcrypt.genSaltSync(10),
  //     null
  //   );
  // });
  return Role;
};
