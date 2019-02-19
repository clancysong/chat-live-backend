import knex from '../connection'

const connection = knex('user')

export default {
  getUserById: (id: number) => connection.select('*').where({ id })
}
