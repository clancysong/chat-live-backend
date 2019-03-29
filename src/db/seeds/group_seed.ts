import * as Knex from 'knex'

exports.seed = (knex: Knex) => {
  return knex('group')
    .del()
    .then(() => {
      return knex('group').insert([
        { name: '群组1', creator_id: 1 },
        { name: '群组2', creator_id: 2 },
        { name: '群组3', creator_id: 3 },
        { name: '群组4', creator_id: 1 },
        { name: '群组5', creator_id: 2 },
        { name: '群组6', creator_id: 3 },
        { name: '群组7', creator_id: 1 },
        { name: '群组8', creator_id: 2 },
        { name: '群组9', creator_id: 3 },
      ])
    })
}
