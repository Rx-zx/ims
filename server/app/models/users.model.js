module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
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
    },{
      tableName: 'user',
      underscored: true,
      timestamps: 'false'
    });
  
    return User;
  };