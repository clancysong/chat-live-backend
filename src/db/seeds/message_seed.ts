import * as Knex from 'knex'

exports.seed = (knex: Knex) => {
  return knex('message')
    .del()
    .then(() => {
      return knex('message').insert([
        { creator: '1', content: 'Hello, i am user1!' },
        { creator: '1', content: 'Hello, i am user1!' },
        { creator: '2', content: 'Hello, i am user2!' },
        { creator: '2', content: 'Hello, i am user2!' },
        { creator: '3', content: 'Hello, i am user3!' },
        { creator: '3', content: 'Hello, i am user3!' },
      ])
    })
}
