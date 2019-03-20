import * as Knex from 'knex'

exports.seed = (knex: Knex) => {
  return knex('group')
    .del()
    .then(() => {
      return knex('group').insert([
        { name: 'group1', members: '{1, 2}', messages: '{1, 3}' },
        { name: 'group2', members: '{2, 3}', messages: '{4, 5}' },
        { name: 'group3', members: '{1, 3}', messages: '{2, 6}' }
      ])
    })
}
