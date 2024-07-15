const { DataTypes, Sequelize } = require('sequelize');

const Timetable = (sequelize) => {
  return  sequelize.define('Timetable', {

    timeslot: {
      type: DataTypes.STRING,
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

        allowNull: true,
      },
    tuesday: {
      type: DataTypes.INTEGER,

      allowNull: true,
    },
    wednesday: {
      type: DataTypes.INTEGER,

      allowNull: true,
    },
    thursday: {
      type: DataTypes.INTEGER,

      allowNull: true,
    },
    friday: {
      type: DataTypes.INTEGER,

      allowNull: true,
    },
    saturday: {
      type: DataTypes.INTEGER,

      allowNull: true,
    },
    sunday: {
      type: DataTypes.INTEGER,

      allowNull: true,
    },
  }, {
    tableName: 'timetable', 
    timestamps: false,
  });
};



module.exports = Timetable;

