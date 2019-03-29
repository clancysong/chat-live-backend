import * as Knex from 'knex'

exports.seed = (knex: Knex) => {
  return knex('message')
    .del()
    .then(() => {
      return knex('message').insert([
        { creator_id: '1', group_id: 1, content: 'Hello, this is message1!' },
        { creator_id: '1', group_id: 2, content: 'Hello, this is message2!' },
        { creator_id: '2', group_id: 1, content: 'Hello, this is message3!' },
        { creator_id: '2', group_id: 2, content: 'Hello, this is message4!' },
        { creator_id: '3', group_id: 1, content: 'Hello, this is message5!' },
        { creator_id: '3', group_id: 2, content: 'Hello, this is message6!' }
      ])
    })
}
