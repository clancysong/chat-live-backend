import OSS from 'ali-oss'
import fs from 'fs'
import getUuid from 'uuid'
import { File } from 'formidable'

class AliOSS {
  private oss: OSS

  constructor() {
    this.oss = new OSS({
      region: 'oss-cn-beijing',
      accessKeyId: 'LTAIzqaPMVIDXusD',
      accessKeySecret: '8CjlCyoAOfN6OvI85bzSchApPSHDR5',
      bucket: 'aliyun-oss-cc'
    })
  }

  public async put(file: File) {
    const stream = fs.createReadStream(file.path)

    const rs = await this.oss.put(`${getUuid()}`, stream)

    return rs
  }
}

export default new AliOSS()
