import Knex from 'knex'

exports.seed = (knex: Knex) => {
  return knex('user')
    .del()
    .then(() => {
      return knex('user').insert([
        { email: 'user1@cc.com', name: 'user1', password: 'uu' },
        { email: 'user2@cc.com', name: 'user2', password: 'uu' },
        { email: 'user3@cc.com', name: 'user3', password: 'uu' }
      ])
    })
}
