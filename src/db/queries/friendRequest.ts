import Query, { TABLE_NAME } from './Query'

class FriendRequestQuery extends Query {
  constructor() {
    super(TABLE_NAME.FRIEND_REQUEST)
  }
}

export default new FriendRequestQuery()
