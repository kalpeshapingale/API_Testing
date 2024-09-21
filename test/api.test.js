const request = require('supertest');
const app = require('../src/index');

describe('User Registration API Tests', () => {
    it('should successfully register with a valid predefined email and valid password', (done) => {
        request(app)
            .post('/api/register')
            .send({ email: 'emma.wong@reqres.in', password: 'Password1!' })
            .expect(200)
            .expect(res => {
                if (res.body.message !== 'User registered successfully')
                    throw new Error(`Expected 'User registered successfully', but got '${res.body.message}'`);
            })
            .end(done);
    });

    it('should fail to register with an email not in the predefined list', (done) => {
        request(app)
            .post('/api/register')
            .send({ email: 'invalid@example.com', password: 'Password1!' })
            .expect(400)
            .expect(res => {
                if (res.body.error !== 'Email not allowed')
                    throw new Error(`Expected 'Email not allowed', but got '${res.body.error}'`);
            })
            .end(done);
    });

    it('should fail to register with an already registered email', (done) => {
        request(app)
            .post('/api/register')
            .send({ email: 'emma.wong@reqres.in', password: 'Password1!' })
            .expect(400)
            .expect(res => {
                if (res.body.error !== 'Email already registered')
                    throw new Error(`Expected 'Email already registered', but got '${res.body.error}'`);
            })
            .end(done);
    });

    it('should fail to register with a password shorter than 6 characters', (done) => {
        request(app)
            .post('/api/register')
            .send({ email: 'george.bluth@reqres.in', password: '123' })
            .expect(400)
            .expect(res => {
                if (res.body.error !== 'Password must be at least 6 characters long, contain one uppercase letter, one number, and one special character')
                    throw new Error(`Expected password error, but got '${res.body.error}'`);
            })
            .end(done);
    });

    it('should fail to register with a password missing an uppercase letter', (done) => {
        request(app)
            .post('/api/register')
            .send({ email: 'charles.morris@reqres.in', password: 'password1!' })
            .expect(400)
            .expect(res => {
                if (res.body.error !== 'Password must be at least 6 characters long, contain one uppercase letter, one number, and one special character')
                    throw new Error(`Expected password error, but got '${res.body.error}'`);
            })
            .end(done);
    });

    it('should fail to register with a password missing a number', (done) => {
        request(app)
            .post('/api/register')
            .send({ email: 'tracey.ramos@reqres.in', password: 'Password!' })
            .expect(400)
            .expect(res => {
                if (res.body.error !== 'Password must be at least 6 characters long, contain one uppercase letter, one number, and one special character')
                    throw new Error(`Expected password error, but got '${res.body.error}'`);
            })
            .end(done);
    });

    it('should fail to register with a password missing a special character', (done) => {
        request(app)
            .post('/api/register')
            .send({ email: 'janet.weaver@reqres.in', password: 'Password123' })
            .expect(400)
            .expect(res => {
                if (res.body.error !== 'Password must be at least 6 characters long, contain one uppercase letter, one number, and one special character')
                    throw new Error(`Expected password error, but got '${res.body.error}'`);
            })
            .end(done);
    });
});

// User Login tests
describe('User Login API Tests', () => {
    // Register a user before testing login
    before((done) => {
        request(app)
            .post('/api/register')
            .send({ email: 'janet.weaver@reqres.in', password: 'Password1!' })
            .end(done);
    });

    it('should successfully log in with valid credentials', (done) => {
        request(app)
            .post('/api/login')
            .send({ email: 'janet.weaver@reqres.in', password: 'Password1!' })
            .expect(200)
            .expect(res => {
                if (!res.body.token) 
                    throw new Error(`Expected a token, but got: ${JSON.stringify(res.body)}`);
            })
            .end(done);
    });

    it('should fail to log in with an unregistered email', (done) => {
        request(app)
            .post('/api/login')
            .send({ email: 'unknown@example.com', password: 'Password1!' })
            .expect(400)
            .expect(res => {
                if (res.body.error !== 'Invalid email or password')
                    throw new Error('Error message does not match');
            })
            .end(done);
    });

    it('should fail to log in with an incorrect password', (done) => {
        request(app)
            .post('/api/login')
            .send({ email: 'janet.weaver@reqres.in', password: 'WrongPassword!' })
            .expect(400)
            .expect(res => {
                if (res.body.error !== 'Invalid email or password')
                    throw new Error('Error message does not match');
            })
            .end(done);
    });

    it('should fail to log in with a password shorter than 6 characters', (done) => {
        request(app)
            .post('/api/login')
            .send({ email: 'janet.weaver@reqres.in', password: '123' })
            .expect(400)
            .expect(res => {
                if (res.body.error !== 'Invalid email or password')
                    throw new Error('Error message does not match');
            })
            .end(done);
    });

    it('should fail to log in with a password missing a special character', (done) => {
        request(app)
            .post('/api/login')
            .send({ email: 'janet.weaver@reqres.in', password: 'Password123' })
            .expect(400)
            .expect(res => {
                if (res.body.error !== 'Invalid email or password')
                    throw new Error('Error message does not match');
            })
            .end(done);
    });
});
