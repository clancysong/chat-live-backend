import Knex from 'knex'

exports.seed = (knex: Knex) => {
  return knex('user')
    .del()
    .then(() => {
      return knex('user').insert([
        { name: 'user1', password: 'uu' },
        { name: 'user2', password: 'uu' },
        { name: 'user3', password: 'uu' }
      ])
    })
}
