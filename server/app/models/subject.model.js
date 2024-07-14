const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Subject = sequelize.define("subject", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      }
    }, {
      tableName: 'subject',
      timestamps: false,
      hooks: {
        beforeValidate: (subject) => {
            if (subject.name) {
                subject.name = subject.name.toUpperCase();
            }
        }
    }
    });
  
    return Subject;
  };
  