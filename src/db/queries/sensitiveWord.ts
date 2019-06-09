import Query, { TABLE_NAME } from './Query'

class SensitiveWordQuery extends Query {
  constructor() {
    super(TABLE_NAME.SENSITIVE_WORD)
  }
}

export default new SensitiveWordQuery()
