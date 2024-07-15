const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Grade = sequelize.define("grade", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      }
    }, {
      tableName: 'grade',
      timestamps: false,
    });
  
    return Grade;
  };
  