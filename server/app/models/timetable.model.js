const { DataTypes, Sequelize } = require('sequelize');

const Timetable = (sequelize) => {
  return  sequelize.define('Timetable', {

    timeslot: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timeslotid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    classroomid: {
      type: DataTypes.INTEGER,
      references: {
          model: 'Classroom', 
          key: 'id',
      },
      allowNull: false,
  },
    monday: {
        type: DataTypes.INTEGER,
        references: {
          model: 'SubjectTutor', 
          key: 'id',
      },

        allowNull: true,
      },
    tuesday: {
      type: DataTypes.INTEGER,
      references: {
        model: 'SubjectTutor', 
        key: 'id',
    },

      allowNull: true,
    },
    wednesday: {
      type: DataTypes.INTEGER,
      references: {
        model: 'SubjectTutor', 
        key: 'id',
    },

      allowNull: true,
    },
    thursday: {
      type: DataTypes.INTEGER,
      references: {
        model: 'SubjectTutor', 
        key: 'id',
    },

      allowNull: true,
    },
    friday: {
      type: DataTypes.INTEGER,
      references: {
        model: 'SubjectTutor', 
        key: 'id',
    },

      allowNull: true,
    },
    saturday: {
      type: DataTypes.INTEGER,
      references: {
        model: 'SubjectTutor', 
        key: 'id',
    },

      allowNull: true,
    },
    sunday: {
      type: DataTypes.INTEGER,
      references: {
        model: 'SubjectTutor', 
        key: 'id',
    },

      allowNull: true,
    },
  }, {
    tableName: 'timetable', 
    timestamps: false,
  });
};



module.exports = Timetable;

