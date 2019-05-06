import * as Knex from 'knex'

exports.seed = (knex: Knex) => {
  return knex('user_user')
    .del()
    .then(() => {
      return knex('user_user').insert([
        // { usera_id: 1, userb_id: 2 },
        // { usera_id: 2, userb_id: 1 },
        // { usera_id: 2, userb_id: 3 },
        // { usera_id: 3, userb_id: 2 },
      ])
    })
}
