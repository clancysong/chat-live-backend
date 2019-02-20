import knex from '../connection'

interface UserInfo {
  name: string
  password: string
}

const connection = knex('user')

export default {
  getUserById: (id: number) => connection.select('*').where({ id }),
  getUserForName: (name: string) => connection.select('*').where({ name }),
  addUser: (userInfo: UserInfo) => connection.insert(userInfo)
}
