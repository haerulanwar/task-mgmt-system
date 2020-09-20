const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')

chai.use(chaiHttp)

describe('User Routes SignUp', () => {
  it('should failed without username', (done) => {
    chai.request(app)
      .post('/api/user/signup')
      .send({
        password:"test",
      })
      .end((err, res) => {
      expect(res).to.have.status(400)
      expect(res.body.message).to.contain('Validation failed')
      done()
    })
  })

  it('should failed without password', (done) => {
    chai.request(app)
      .post('/api/user/signup')
      .send({
        username:"test",
      })
      .end((err, res) => {
      expect(res).to.have.status(400)
      expect(res.body.message).to.contain('Validation failed')
      done()
    })
  })

  it('success to SignUp', (done) => {
    chai.request(app)
      .post('/api/user/signup')
      .send({
        username:"test",
        password:"test"
      })
      .end((err, res) => {
      expect(res).to.have.status(200)
      expect(res.body.message).to.contain('Success to register')
      done()
    })
  })
})

describe('User Routes SignIn', () => {
  it('should failed without username', (done) => {
    chai.request(app)
      .post('/api/user/signup')
      .send({
        password:"test",
      })
      .end((err, res) => {
      expect(res).to.have.status(400)
      expect(res.body.message).to.contain('Validation failed')
      done()
    })
  })

  it('should failed without password', (done) => {
    chai.request(app)
      .post('/api/user/signup')
      .send({
        username:"test",
      })
      .end((err, res) => {
      expect(res).to.have.status(400)
      expect(res.body.message).to.contain('Validation failed')
      done()
    })
  })

  it('should failed user not found', (done) => {
    chai.request(app)
      .post('/api/user/signup')
      .send({
        username:"notfound",
        password:"test"
      })
      .end((err, res) => {
      expect(res).to.have.status(404)
      expect(res.body.message).to.contain('User not found')
      done()
    })
  })

  it('success to SignUp', (done) => {
    chai.request(app)
      .post('/api/user/signup')
      .send({
        username:"test",
        password:"test"
      })
      .end((err, res) => {
      expect(res).to.have.status(200)
      expect(res.body.message).to.contain('Success to login')
      done()
    })
  })
})