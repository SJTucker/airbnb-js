/* jshint expr: true */

'use strict';

process.env.DBNAME = 'airbnb-test';
var expect = require('chai').expect;
var Mongo = require('mongodb');
var User;
var uEx;

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
      uEx = new User({role:'host', email: 'sam@aol.com', password:'1234'});
      uEx.register(function(){
        done();

      });
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

  describe('#register', function(){
    it('should register a new User', function(done){
      var u1 = new User({role:'host', email:'samueljeffersontucker@gmail.com', password:'1234'});
      u1.register(function(err, body){
        expect(err).to.not.be.ok;
        expect(u1.password).to.have.length(60);
        expect(u1._id).to.be.instanceof(Mongo.ObjectID);
        body = JSON.parse(body);
        console.log(body);
        expect(body.id).to.be.ok;
        done();
      });
    });

    it('should not register a user with the same email', function(done){
      var u3 = new User({role:'host', email:'sam@aol.com', password:'1234'});
      u3.register(function(err){
        expect(u3._id).to.be.undefined;
        done();
      });
    });
  });

});
