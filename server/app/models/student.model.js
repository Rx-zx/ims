const { DataTypes } = require('sequelize');

const Student = (sequelize) => {
  return sequelize.define('Student', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user', 
        key: 'id',
      },
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'student', 
    timestamps: false,
  });
};

module.exports = Student;
