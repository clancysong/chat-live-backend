import Group from './Group'

export default interface User {
  id: number
  email: string
  name: string
  password: string
  online: boolean
  groupsInfo?: Group[]
}
