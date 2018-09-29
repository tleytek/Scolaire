module.exports = function(sequelize, DataTypes) {
  var Teacher = sequelize.define("Teacher", {
    teacherName: DataTypes.STRING
  });

  Teacher.associate = function(models) {
    Teacher.hasMany(models.Student, {
      onDelete: "cascade",
      as: "studentsNames"
    });
  };
  return Teacher;
};
