import Knex from 'knex'

exports.seed = (knex: Knex) => {
  return knex('user')
    .del()
    .then(() => {
      return knex('user').insert(
        Array.from({ length: 3 }, (_, i) => i + 1)
          .map(i => ({
            email: `user${i}@cc.com`,
            name: `用户${i}`,
            password: 'uu',
            permission_level: 1
          }))
          .concat([
            {
              email: `admin@cc.com`,
              name: `炒鸡管理猿`,
              password: 'admin',
              permission_level: 3
            }
          ])
      )
    })
}
