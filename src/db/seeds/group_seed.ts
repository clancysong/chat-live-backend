import * as Knex from 'knex'

exports.seed = (knex: Knex) => {
  return knex('group')
    .del()
    .then(() => {
      return knex('group').insert([
        { name: '群组1', creator: 1 },
        { name: '群组2', creator: 2 },
        { name: '群组3', creator: 3 },
        { name: '群组4', creator: 1 },
        { name: '群组5', creator: 2 },
        { name: '群组6', creator: 3 },
        { name: '群组7', creator: 1 },
        { name: '群组8', creator: 2 },
        { name: '群组9', creator: 3 },
      ])
    })
}
