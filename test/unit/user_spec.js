/* jshint expr: true */

'use strict';

process.env.DBNAME = 'airbnb-test';
var expect = require('chai').expect;
//var Mongo = require('mongodb');
var User;

describe('User', function(){

  before(function(done){
    var initMongo = require('../../app/lib/init-mongo');
    initMongo.db(function(){
      User = require('../../app/models/user');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result) {
      done();
    });
  });

  describe('new', function(){
    it('should create a new User obj', function(){
      var u1 = new User({role:'host', email: 'tyler@aol.com', password:'1234'});
      expect(u1).to.be.instanceof(User);
      expect(u1.email).to.equal('tyler@aol.com');
      expect(u1.password).to.equal('1234');
      expect(u1.role).to.equal('host');

    });
  });

});
