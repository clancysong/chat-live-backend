import * as Knex from 'knex'

exports.seed = (knex: Knex) => {
  return knex('message')
    .del()
    .then(() => {
      return knex('message').insert([
        { creator: '1', content: 'Hello, this is message1!' },
        { creator: '1', content: 'Hello, this is message2!' },
        { creator: '2', content: 'Hello, this is message3!' },
        { creator: '2', content: 'Hello, this is message4!' },
        { creator: '3', content: 'Hello, this is message5!' },
        { creator: '3', content: 'Hello, this is message6!' },
      ])
    })
}
