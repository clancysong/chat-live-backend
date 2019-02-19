import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../src/index'

const should  = chai.should()

chai.use(chaiHttp)

describe('routes: index', () => {
  describe('GET /', () => {
    it('say hi', done => {
      chai
        .request(server)
        .get('/')
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.eql(200)
          res.type.should.eql('application/json')
          res.body.status.should.eql('success')
          res.body.data.should.eql('Hi TS')
          done()
        })
    })
  })
})
