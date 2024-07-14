const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Subject = sequelize.define("grade", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      }
    }, {
      tableName: 'grade',
      timestamps: false,
    });
  
    return Subject;
  };
  