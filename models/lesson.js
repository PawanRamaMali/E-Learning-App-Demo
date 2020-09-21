module.exports = (sequelize, DataTypes) => {
  const Lesson = sequelize.define("Lesson", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CourseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    indexes: [
      {
          unique: true,
          fields: ["name", "CourseId"]
      }
    ]
  });

  //associations
  Lesson.associate = (models) => {
    Lesson.belongsTo(models.Course, {
      foreignKey: {
        name: "CourseId",
        allowNull: false,
      },
    });
    // Lesson.belongsToMany(models.Content, {
    //   through: "lesson_content",
    //   foreignKey: "lessonId",
    //   otherKey: "contentId",
    // });
    //association to user model
    Lesson.belongsToMany(models.User, {
      through: models.Users_Lessons,
      foreignKey: "lessonId",
      otherKey: "userId",
    });
  };
  return Lesson;
};