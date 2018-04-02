'use strict';

var bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      set: function(val) {
        this.setDataValue('password', bcrypt.hashSync(val, 8));
      },
      validate: {
        notIn: [['password']],
        notEmpty: true
      }
    }
  }, {});

  User.associate = function(models) {
    // add associations if needed
  };

  User.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());

    delete values.password;
    return values;
  };

  User.prototype.isValidPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};