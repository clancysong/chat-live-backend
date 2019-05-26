import Query, { TABLE_NAME } from './Query'

class GroupQuery extends Query {
  constructor() {
    super(TABLE_NAME.GROUP)
  }

  public findByUuid = (uuid: string) => this.findAll({ uuid }).first()

  public findByCreator = (id: number) => this.findAll({ creator: id })

  public findByType = (type: string) => this.findAll({ type })

  public findByMember = (id: number) =>
    this.connect()
      .select('group_id as id', 'uuid', 'name', 'creator_id', 'cover', 'avatar')
      .leftJoin('user_group', 'group.id', 'user_group.group_id')
      .where('user_group.user_id', id)

  public findByInviteCode = (inviteCode: string) => this.findAll({ invite_code: inviteCode }).first()
}

export default new GroupQuery()
