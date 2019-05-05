import Query, { TABLE_NAME } from './Query'

class FriendRequestQuery extends Query {
  constructor() {
    super(TABLE_NAME.FRIEND_REQUEST)
  }

  public findByReceiver = (id: number) =>
    this.connect()
      .select(
        'friend_request.id as id',
        'user.id as requester_id',
        'user.name as requester_name',
        'user.status as requester_status'
      )
      .leftJoin('user', 'friend_request.requester_id', 'user.id')
      .where('friend_request.receiver_id', id)
}

export default new FriendRequestQuery()
