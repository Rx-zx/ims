module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      user_type: {
        type: Sequelize.ENUM('ADMIN', 'STUDENT', 'TUTOR', 'NA', 'STAFF')
      }
    });
  
    return Users;
  };