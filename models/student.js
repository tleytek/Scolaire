module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define("Student", {
    studentName: DataTypes.STRING,
    attendance: DataTypes.INTEGER,
    math: DataTypes.INTEGER,
    english: DataTypes.INTEGER,
    science: DataTypes.INTEGER,
    art: DataTypes.INTEGER,
    gym: DataTypes.INTEGER
  });
  return Student;
};
