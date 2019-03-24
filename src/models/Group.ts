import User from './User'
import Message from './Message'

export default interface Group {
  id: number
  name: string
  creator: number
  members: number[]
  messages: number[]
  channels: number[]
  membersInfo?: User[]
  messagesInfo?: Message[]
}
