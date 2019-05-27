import OSS from 'ali-oss'

const oss = new OSS({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAIzqaPMVIDXusD',
  accessKeySecret: '8CjlCyoAOfN6OvI85bzSchApPSHDR5',
  bucket: 'aliyun-oss-cc'
})

export default oss
