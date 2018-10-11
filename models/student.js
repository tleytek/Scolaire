module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define("Student", {
    studentName: DataTypes.STRING
  });
  return Student;
};
