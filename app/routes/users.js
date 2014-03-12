'use strict';

//var users = global.nss.db.collection('users');
var User = require('../models/user');



exports.register = function(req, res){
  res.render('users/fresh', {title: 'Register'});
};

exports.create = function(req, res){
  var user = new User(req.body);
  user.register(function(){
    if(user._id){
      res.redirect('/');
    }else{
      res.render('users/fresh', {title: 'Register'});
    }
  });
};
