'use strict';

var bcrypt = require('bcrypt');
var users = global.nss.db.collection('users');
var email = require('../lib/email');

var User;
module.exports = User;

function User(user){
  this.email = user.email;
  this.password = user.password;
  this.role = user.role;
}

User.prototype.register = function(fn){
  var self = this;
  hashPassword(self.password, function(hash){
    self.password = hash;
    insert(self, function(err){
      if(self._id){
        email.sendWelcome({to:self.email}, function(err, body){
          fn(err, body);
        });
      }else{
        fn();
      }
    });
  });
};

User.findByEmailAndPassword = function(email, password, fn){
  users.findOne({email:email}, function(err, record){
    if(record){
      bcrypt.compare(password, record.password, function(err, result){
        if(result){
          fn(record);
        }else{
          fn(null);
        }
      });
    }else{
      fn(null);
    }
  });
};
///////PRIVATE FUNCTIONS////////////////

function hashPassword(pass, fn){
  bcrypt.hash(pass, 8, function(err, hash){
    fn(hash);
  });
}

function insert(user, fn){
  users.findOne({email:user.email}, function(err, found){
    if(!found){
      users.insert(user, function(err, record){
        fn(err);
      });
    }else{
      fn();
    }
  });
}
