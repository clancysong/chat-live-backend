import Knex from 'knex'

exports.seed = (knex: Knex) => {
  return knex('user')
    .del()
    .then(() => {
      return knex('user').insert([
        {
          email: 'user1@cc.com',
          name: 'user1',
          password: 'uu',
          groups: '{1, 3, 4, 5, 6, 7, 8, 9}'
        },
        {
          email: 'user2@cc.com',
          name: 'user2',
          password: 'uu',
          groups: '{1, 2, 5, 6, 7, 8, 9}'
        },
        {
          email: 'user3@cc.com',
          name: 'user3',
          password: 'uu',
          groups: '{2, 3, 4, 7, 8, 9}'
        }
      ])
    })
}
