const dbConfig = require("../config/db.config.js");
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: true,
  logging: false,
});

const User = require('./user.model')(sequelize, Sequelize.DataTypes);
const Student = require('./student.model')(sequelize, Sequelize.DataTypes);
const Tutor = require('./tutor.model')(sequelize, Sequelize.DataTypes);
const Staff = require('./staff.model')(sequelize, Sequelize.DataTypes);

sequelize.sync()
  .then(() => {
    console.log('Database synchronized.');
  })
  .catch(err => {
    console.error('Failed to sync database:', err.message);
  });

module.exports = {
  sequelize,
  User,
  Student,
  Tutor,
  Staff
};