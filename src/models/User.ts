export default interface User {
  id: number
  email: string
  name: string
  password: string
  online: boolean
  friends: number[]
  friends_request: number[]
}
