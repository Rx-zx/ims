const { DataTypes } = require('sequelize');

const Subject = (sequelize) => {
  return sequelize.define('Subject', {
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
};

module.exports = Subject;
  