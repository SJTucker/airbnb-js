'use strict';

//var User;

module.exports = function User(user){
  this.email = user.email;
  this.password = user.password;
  this.role = user.role;
};
