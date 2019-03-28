import Knex from 'knex'

exports.seed = (knex: Knex) => {
  return knex('user')
    .del()
    .then(() => {
      return knex('user').insert([
        {
          email: 'user1@cc.com',
          name: '用户1',
          password: 'uu'
        },
        {
          email: 'user2@cc.com',
          name: '用户2',
          password: 'uu'
        },
        {
          email: 'user3@cc.com',
          name: '用户3',
          password: 'uu'
        }
      ])
    })
}
