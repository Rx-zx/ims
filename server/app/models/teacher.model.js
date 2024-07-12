module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("teachers", {
      name: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      contact: {
        type: Sequelize.INTEGER
      },
      user_type: {
        type: Sequelize.ENUM('ADMIN', 'STUDENT', 'TUTOR', 'NA', 'STAFF')
      }
    });
  
    return Users;
  };