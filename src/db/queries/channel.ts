import Query, { TABLE_NAME } from './Query'

class GroupQuery extends Query {
  constructor() {
    super(TABLE_NAME.CHANNEL)
  }

  public findByUuid = (uuid: string) => this.findAll({ uuid }).first()

  public findByGroup = (id: number) => this.findAll({ group_id: id })
}

export default new GroupQuery()
