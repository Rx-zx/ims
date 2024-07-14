const { DataTypes } = require('sequelize');

const User = (sequelize) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, 
      unique: true,
      validate: {
        isEmail: true, 
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    user_type: {
      type: DataTypes.ENUM('ADMIN', 'STUDENT', 'TUTOR', 'NA', 'STAFF'),
      allowNull: false, 
      defaultValue: 'NA', 
    },
  }, {
    tableName: 'user',
    underscored: true,
    timestamps: false, 
  });

  return User;
};

module.exports = User;
