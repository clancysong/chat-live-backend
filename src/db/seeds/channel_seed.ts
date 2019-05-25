import Knex from 'knex'
import uuid from 'uuid'

exports.seed = (knex: Knex) => {
  return knex('channel')
    .del()
    .then(() => {
      return knex('channel').insert(
        Array.from({ length: 9 }, (_, i) => i + 1).map(i => ({
            uuid: uuid(),
            name: 'general',
            creator_id: i,
            group_id: i
        }))
      )
    })
}
