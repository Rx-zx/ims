const { DataTypes, Sequelize } = require('sequelize');

const StudentSubject = (sequelize) => {
  return  sequelize.define('StudentSubject', {
    studentid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Student', 
        key: 'id',
      },
      allowNull: false,
    },
    subjecttutorid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'SubjectTutor', 
          key: 'id',
        },
        allowNull: false,
      },
  }, {
    tableName: 'student_subject', 
    timestamps: false,
    // underscored: true
  });
};



module.exports = StudentSubject;

