import * as Knex from 'knex'

exports.seed = (knex: Knex) => {
  return knex('user_group')
    .del()
    .then(() => {
      return knex('user_group').insert([
        { user_id: 1, group_id: 1 },
        { user_id: 2, group_id: 2 },
        { user_id: 3, group_id: 3 },
      ])
    })
}
