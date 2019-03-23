import * as Knex from 'knex'

exports.seed = (knex: Knex) => {
  return knex('group')
    .del()
    .then(() => {
      return knex('group').insert([
        { name: 'group1', creator: 1, members: '{1, 2}', messages: '{1, 3}' },
        { name: 'group2', creator: 2, members: '{2, 3}', messages: '{4, 5}' },
        { name: 'group3', creator: 3, members: '{1, 3}', messages: '{2, 6}' },
        { name: 'group4', creator: 1, members: '{1, 3}', messages: '{1, 5, 6}' },
        { name: 'group5', creator: 2, members: '{2, 1}', messages: '{2, 3, 4}' },
        { name: 'group6', creator: 3, members: '{1, 2}', messages: '{1, 2, 3}' },
        { name: 'group7', creator: 1, members: '{1, 2 ,3}', messages: '{1, 2, 3, 4}' },
        { name: 'group8', creator: 2, members: '{1, 2 ,3}', messages: '{2, 3, 4, 5}' },
        { name: 'group9', creator: 3, members: '{1, 2 ,3}', messages: '{1, 2, 5, 6}' },
      ])
    })
}
