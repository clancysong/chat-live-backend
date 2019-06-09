import * as Knex from 'knex'

exports.seed = (knex: Knex) => {
  return knex('sensitive_word')
    .del()
    .then(() => {
      return knex('sensitive_word').insert([
        { content: '傻逼' },
        { content: '废物' },
      ])
    })
}
