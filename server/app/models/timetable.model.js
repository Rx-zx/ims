module.exports = (sequelize, Sequelize) => {
    const TimeTable = sequelize.define("timetables", {
      grade: {
        type: Sequelize.STRING
      },
      subject: {
        type: Sequelize.STRING
      },
      day: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.TIME,
        allowNull: false,
      }
    });
  
    return TimeTable;
  };