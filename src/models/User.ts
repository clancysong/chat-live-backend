import Group from './Group'

export default interface User {
  id: number
  email: string
  name: string
  password: string
  online: boolean
  groups: number[]
  friends: number[]
  friends_request: number[]
  groupsInfo?: Group[]
}
