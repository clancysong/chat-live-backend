import Query, { TABLE_NAME } from './Query'

class GroupQuery extends Query {
  constructor() {
    super(TABLE_NAME.GROUP)
  }

  public findByCreator = (creatorId: number) => this.findAll({ creator: creatorId })
}

export default new GroupQuery()