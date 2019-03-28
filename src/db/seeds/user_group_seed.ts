import * as Knex from 'knex'

exports.seed = (knex: Knex) => {
  return knex('user_group')
    .del()
    .then(() => {
      return knex('user_group').insert([
        { user: 1, group: 1 },
        { user: 1, group: 4 },
        { user: 1, group: 7 },
        { user: 2, group: 2 },
        { user: 2, group: 5 },
        { user: 2, group: 8 },
        { user: 3, group: 3 },
        { user: 3, group: 6 },
        { user: 3, group: 9 },

        { user: 1, group: 2 },
        { user: 1, group: 5 },
        { user: 1, group: 8 },
        { user: 2, group: 3 },
        { user: 2, group: 6 },
        { user: 2, group: 9 },
        { user: 3, group: 1 },
        { user: 3, group: 4 },
        { user: 3, group: 7 }
      ])
    })
}
