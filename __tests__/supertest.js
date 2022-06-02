const request = require('supertest');
const mongoose = require('mongoose');
const databaseName = test;
const server = 'http://localhost:8080';

//connect to MongoDB
// beforeAll(async () => {
//   const url = 'mongodb+srv://iteration:project01@iteration.6rbhg.mongodb.net/?retryWrites=true&w=majority';
//   await mongoose.connect(url, {useNewUrlParser: true, dbName: databaseName})
// });


//test routes
describe('Route Integration', () => {
  //main page
  describe('request to main page', () => {
    describe('GET /', () => {
      it('sends 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200)
      });
    });
  });
  //restaurant api calls
    //search with zip code - returns 200 and json
  describe('restaurant search request', () => {
    describe('GET', () => {
      it('responds to zip input with 200 status and json content type', () => {
        return request(server)
          .get('/api/restaurant/search?location=10001')
          .expect('Content-Type', /application\/json/)
          .expect(200)
      });
      //search with city string only
      it('responds to city input with 200 status and json content type', () => {
        return request(server)
          .get('/api/restaurant/search?location=NYC')
          .expect('Content-Type', /application\/json/)
          .expect(200)
      });
      //search with city and state
      it('responds to city and state input with 200 status and json content type', () => {
        return request(server)
          .get('/api/restaurant/search?location=NYC')
          .expect('Content-Type', /application\/json/)
          .expect(200)
      });
      //empty search request not valid
      it('sends error to empty search request', () => {
        return request(server)
          .get('/api/restaurant/search?location=')
          .expect(error)
      });
    });
  });
  //login -NEED TO KNOW ROUTES
  describe('authentication', () => {
    describe('request with valid credentials', () => {
      it('sends 200 status response and redirects to main-page', () => {
        return request(server)
          .post('/api/login/')
          .send({user: 'username', password: 'password'})
          .expect('Content-Type', /text\/html/)
          .expect(200)
          .redirects(1)
          .expect('Location', /\/$/)
      });
    });
    describe('request with invalid credentials', () => {
      it('sends 401 status response and prevent redirect', () => {
        return request(server)
          .post('/api/login/')
          .send({user: 'notusername', password: 'notpassword'})
          .expect(401)
          .redirects(0)
          .expect('Location', /\/api\/login\/$/)
      });
    });
  });
  //sign-up
  describe('sign-up', () => {
    describe('request with valid and available credentials', () => {
      it('sends 200 status response and redirects to main-page', () => {
        return request(server)
          .post('/api/signup/')
          .send({user: 'username1234', password: 'password'})
          .expect('Content-Type', /application\/html/)
          .expect(200)
          .redirects(1)
          .expect('Location', /http:localhost:8080\/$/)
      });
    });
    describe('request with invalid credentials', () => {
      it('sends 400 status response and prevent redirect', () => {
        return request(server)
          .post('/api/signup/')
          .send({user: 'u', password: 'notpassword'})
          .expect(200)
          .redirects(0)
          .expect('Location', /\/api\/signup\/$/)
      });
    });
    describe('request with unavailable credentials', () => {
      it('sends 400 status response and prevent redirect', () => {
        return request(server)
          .post('/api/signup/')
          .send({user: 'username1234', password: 'notpassword'})
          .expect(400)
          .redirects(0)
          .expect('Location', /\/api\/signup\/$/)
      });
    });
  });
  //users
  //invalid requests
  describe('invalid requests', () => {
    describe('request to invalid route', () => {
      it('sends 404 status with error', () => {
        return request(server)
          .get('/api/restauwant')
          .expect(404)
      });
    });
    describe('request to incomplete route', () => {
      it('sends 404 status with error', () => {
        return request(server)
          .get('/api')
          .expect(404)
      });
    });
    describe('request to valid route but invalid method', () => {
      it('sends 404 status with error', () => {
        return request(server)
          .delete('/api')
          .expect(405)
      });
    });
  });
});