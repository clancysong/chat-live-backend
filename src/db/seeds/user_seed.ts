import Knex from 'knex'

exports.seed = (knex: Knex) => {
  return knex('user')
    .del()
    .then(() => {
      return knex('user').insert([
        { username: 'user1', password: 'uu' },
        { username: 'user2', password: 'uu' },
        { username: 'user3', password: 'uu' }
      ])
    })
}
