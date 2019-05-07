import * as Knex from 'knex'

exports.seed = (knex: Knex) => {
  return knex('message')
    .del()
    .then(() => {
      // return knex('message').insert(
      //   Array.from({ length: 9 }, (_, i) => i + 1).map(i => ({
      //     creator_id: Math.ceil(i / 3),
      //     chat_type: 'group',
      //     chat_id: i,
      //     content: `你好，这是一条ID为${i}预置消息！`
      //   }))
      // )
    })
}
