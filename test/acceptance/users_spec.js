'use strict';

process.env.DBNAME = 'airbnb-test';
var app = require('../../app/app');
var request = require('supertest');
var expect = require('chai').expect;
var User;
var sue;

describe('users', function(){

  before(function(done){
    request(app)
    .get('/')
    .end(function(err, res){
      User = require('../../app/models/user');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      sue = new User({role: 'host', email: 'sue@gmail.com', password: '1234'});
      sue.register(function(){
        done();
      });
    });
  });

  describe('GET /register', function(){
    it('should display the register page', function(done){
      request(app)
      .get('/register')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Register');
        done();
      });
    });
  });

  describe('POST /register', function(){
    it('should register a new user', function(done){
      request(app)
      .post('/register')
      .field('role', 'host')
      .field('email', 'sam@aol.com')
      .field('password', '1234')
      .end(function(err, res){
        expect(res.status).to.equal(302);
        expect(res.text).to.not.include('Register');
        done();
      });
    });
    
    it('should not register a new user', function(done){
      request(app)
      .post('/register')
      .field('role', 'host')
      .field('email', 'sue@gmail.com')
      .field('password', '1234')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Register');
        done();
      });
    });
  });

  describe('GET /login', function(){
    it('should bring the user to the login page', function(done){
      request(app)
      .get('/login')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Login');
        done();
      });
    });

    it('should login a user', function(done){
      request(app)
      .post('/login')
      .field('email', 'sue@gmail.com')
      .field('password', '1234')
      .end(function(err, res){
        expect(res.status).to.equal(302);
        expect(res.text).to.not.include('Login');
        done();
      });
    });

    it('should not login a user', function(done){
      request(app)
      .post('/login')
      .field('email', 'bad@gmail.com')
      .field('password', '1234')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Login');
        done();
      });
    });

    it('should not login a user', function(done){
      request(app)
      .post('/login')
      .field('email', 'sue@gmail.com')
      .field('password', 'bad')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Login');
        done();
      });
    });
  });



});
