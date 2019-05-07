import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../src/index'

const should = chai.should()

chai.use(chaiHttp)

describe('routes: user', () => {
  describe('GET /api/user/:id', () => {
    it('获取 ID 为 1 的用户', done => {
      chai
        .request(server)
        .get('/api/user/1')
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.eql(200)
          res.type.should.eql('application/json')
          res.body.status.should.eql('success')
          res.body.data[0].should.include.keys('id', 'name', 'password')
        })

      done()
    })
  })

  describe('POST /api/login', () => {
    it('用户登录', done => {
      chai
        .request(server)
        .post('api/login')
        .send({ name: 'user1', password: 'uu' })
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.eql(200)
          res.type.should.eql('application/json')
          res.body.status.should.eql('success')
        })

      done()
    })
  })

  describe('POST /api/register', () => {
    it('用户注册', done => {
      chai
        .request(server)
        .post('api/register')
        .send({ name: 'test', password: 'test' })
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.eql(201)
          res.type.should.eql('application/json')
          res.body.status.should.eql('success')
        })

      done()
    })
  })
})
