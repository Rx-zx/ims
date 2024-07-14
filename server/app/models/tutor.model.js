const { DataTypes } = require('sequelize');

const Tutor = (sequelize) => {
  return sequelize.define('Tutor', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user', 
        key: 'id',
      },
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'tutor', 
    timestamps: false,
  });
}

module.exports = Tutor;
