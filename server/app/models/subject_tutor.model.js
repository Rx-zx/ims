const { DataTypes, Sequelize } = require('sequelize');

const SubjectTutor = (sequelize) => {
  return  sequelize.define('SubjectTutor', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      
    },
    tutorid: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Tutor', 
        key: 'id',
      },
      allowNull: false,
    },
    subjectid: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Subject', 
          key: 'id',
        },
        allowNull: false,
      },
    gradeid: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Grade', 
            key: 'id',
        },
        allowNull: false,
    },
    fees: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
  }, {
    tableName: 'subject_tutor', 
    timestamps: false,
    underscored: true
  });
};



module.exports = SubjectTutor;

