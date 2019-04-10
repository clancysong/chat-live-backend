import * as Knex from 'knex'

exports.seed = (knex: Knex) => {
  return knex('group')
    .del()
    .then(() => {
      return knex('group').insert(
        Array.from({ length: 9 }, (_, i) => i + 1).map(i => ({ name: `群组${i}`, creator_id: 1, type: 'public' }))
      )
    })
}
