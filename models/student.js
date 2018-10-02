module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define("Student", {
    studentName: DataTypes.STRING,
    attendance: DataTypes.INTEGER,
<<<<<<< HEAD
    grades: {
      math: DataTypes.INTEGER,
      english: DataTypes.INTEGER,
      science: DataTypes.INTEGER,
      art: DataTypes.INTEGER,
      gym: DataTypes.INTEGER
    }
=======
    math: DataTypes.INTEGER,
    english: DataTypes.INTEGER,
    science: DataTypes.INTEGER,
    art: DataTypes.INTEGER,
    gym: DataTypes.INTEGER
>>>>>>> a7b19308fa726d3b7f910f4255245fd2aa31919a
  });
  return Student;
};
