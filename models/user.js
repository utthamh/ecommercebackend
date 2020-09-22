const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/dbconnection');

const User = sequelize.define('User', {
  
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING

  },
  password:{
    type: DataTypes.STRING
  },
  email:{
      type:DataTypes.STRING
  },
  isAdmin:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
  }

}, {
  // Other model options go here
});
sequelize.sync()
 module.exports=User