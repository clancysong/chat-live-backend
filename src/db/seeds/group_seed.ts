import * as Knex from 'knex'
import getUuid from 'uuid'

const getInviteCode = () => {
  const a = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const codes = []
  const count = 6

  for (let i = 0; i < count; i++) {
    codes.push(a[Math.floor(Math.random() * a.length)])
  }

  return codes.join('')
}

exports.seed = (knex: Knex) => {
  return knex('group')
    .del()
    .then(() => {
      return knex('group').insert([
        {
          uuid: getUuid(),
          name: 'MINECRAFT',
          creator_id: 4,
          type: 'public',
          avatar: 'https://aliyun-oss-cc.oss-cn-beijing.aliyuncs.com/a_4a2d4c71d0ec0c7f72792d7280a6529d.png',
          cover: 'https://aliyun-oss-cc.oss-cn-beijing.aliyuncs.com/b3abc737a37bdff48d0d3237b65ac994.jpg',
          invite_code: getInviteCode()
        },
        {
          uuid: getUuid(),
          name: 'Overwatch',
          creator_id: 1,
          type: 'public',
          avatar: 'https://aliyun-oss-cc.oss-cn-beijing.aliyuncs.com/a_e5ccfab42282c46a84470feef48f6080.png',
          cover: 'https://aliyun-oss-cc.oss-cn-beijing.aliyuncs.com/d5d92bb9d45954d6f17e4980c531e8cf.jpg',
          invite_code: getInviteCode()
        },
        {
          uuid: getUuid(),
          name: 'Terraria',
          creator_id: 1,
          type: 'public',
          avatar: 'https://aliyun-oss-cc.oss-cn-beijing.aliyuncs.com/a_d3f24bee51c0c7e92564b7c1a71046e1.png',
          cover: 'https://aliyun-oss-cc.oss-cn-beijing.aliyuncs.com/6bc3551f0ffdf333ca7deed6c73f4160.jpg',
          invite_code: getInviteCode()
        },
        {
          uuid: getUuid(),
          name: 'Monster Hunter',
          creator_id: 1,
          type: 'public',
          avatar: 'https://aliyun-oss-cc.oss-cn-beijing.aliyuncs.com/a_e07e68f307589508e2f0df12828a894d.png',
          cover: 'https://aliyun-oss-cc.oss-cn-beijing.aliyuncs.com/9b9b60b0567d61b2777f167f81e17a69.jpg',
          invite_code: getInviteCode()
        },
        {
          uuid: getUuid(),
          name: 'Grand Theft Auto',
          creator_id: 1,
          type: 'public',
          avatar: 'https://aliyun-oss-cc.oss-cn-beijing.aliyuncs.com/a_f6ccfceb81ad18c54373cef8a258356b.png',
          cover: 'https://aliyun-oss-cc.oss-cn-beijing.aliyuncs.com/19d190408f603d5661965c60a8358da3.jpg',
          invite_code: getInviteCode()
        },
        {
          uuid: getUuid(),
          name: 'Hearthstone',
          creator_id: 1,
          type: 'public',
          avatar: 'https://aliyun-oss-cc.oss-cn-beijing.aliyuncs.com/a_4fab6195c17539250500ff3a161220ab.png',
          cover: 'https://aliyun-oss-cc.oss-cn-beijing.aliyuncs.com/b2e561a9604bf25689e18477254558c5.jpg',
          invite_code: getInviteCode()
        },
        {
          uuid: getUuid(),
          name: 'RuneScape',
          creator_id: 1,
          type: 'public',
          avatar: 'https://aliyun-oss-cc.oss-cn-beijing.aliyuncs.com/50605e0ea8423847ad41a1a83c887c64.png',
          cover: 'https://aliyun-oss-cc.oss-cn-beijing.aliyuncs.com/65cbaf1dbc0dc8eb5dd4afd67b17160d.jpg',
          invite_code: getInviteCode()
        },
        {
          uuid: getUuid(),
          name: 'Rainbow 6',
          creator_id: 1,
          type: 'public',
          avatar: 'https://aliyun-oss-cc.oss-cn-beijing.aliyuncs.com/a_99633950fbfe3e46a1d4504aae955bc8.png',
          cover: 'https://aliyun-oss-cc.oss-cn-beijing.aliyuncs.com/e839a44e76556672880ee0551bbd84f5.jpg            ',
          invite_code: getInviteCode()
        },
        {
          uuid: getUuid(),
          name: 'For Honor',
          creator_id: 1,
          type: 'public',
          avatar: 'https://aliyun-oss-cc.oss-cn-beijing.aliyuncs.com/a3c4ef5b24f8333ac4e50f67ce31084a.png',
          cover: 'https://aliyun-oss-cc.oss-cn-beijing.aliyuncs.com/294d6e4c30003f3a6d4213e92b3c3c9b.jpg',
          invite_code: getInviteCode()
        }
      ])
    })
}
