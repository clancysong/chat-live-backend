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
          creator_id: 1,
          type: 'public',
          avatar: 'https://cdn.discordapp.com/icons/302094807046684672/803f8646d3b559020cd0d88e95132f55.png?size=256',
          cover:
            'https://cdn.discordapp.com/splashes/302094807046684672/b3abc737a37bdff48d0d3237b65ac994.jpg?size=1024',
          invite_code: getInviteCode()
        },
        {
          uuid: getUuid(),
          name: 'Overwatch',
          creator_id: 1,
          type: 'public',
          avatar: 'https://cdn.discordapp.com/icons/94882524378968064/13e4d1703e7aa68ff169bb632f6466d9.png?size=256',
          cover: 'https://cdn.discordapp.com/splashes/94882524378968064/d5d92bb9d45954d6f17e4980c531e8cf.jpg?size=1024',
          invite_code: getInviteCode()
        },
        {
          uuid: getUuid(),
          name: 'Terraria',
          creator_id: 1,
          type: 'public',
          avatar: 'https://cdn.discordapp.com/icons/251072485095636994/6fb342118d7218aabd0604a4fe128aa1.png?size=256',
          cover:
            'https://cdn.discordapp.com/splashes/251072485095636994/6bc3551f0ffdf333ca7deed6c73f4160.jpg?size=1024',
          invite_code: getInviteCode()
        },
        {
          uuid: getUuid(),
          name: 'Monster Hunter',
          creator_id: 1,
          type: 'public',
          avatar: 'https://cdn.discordapp.com/icons/120889695658967041/8b2a035862ee9f3fe366ddbc5d04da86.png?size=256',
          cover:
            'https://cdn.discordapp.com/splashes/120889695658967041/9b9b60b0567d61b2777f167f81e17a69.jpg?size=1024',
          invite_code: getInviteCode()
        },
        {
          uuid: getUuid(),
          name: 'Grand Theft Auto',
          creator_id: 1,
          type: 'public',
          avatar: 'https://cdn.discordapp.com/icons/190946039467868160/dbc652e39a289d9af6ff51226173158e.png?size=256',
          cover:
            'https://cdn.discordapp.com/splashes/190946039467868160/19d190408f603d5661965c60a8358da3.jpg?size=1024',
          invite_code: getInviteCode()
        },
        {
          uuid: getUuid(),
          name: 'Hearthstone',
          creator_id: 1,
          type: 'public',
          avatar: 'https://cdn.discordapp.com/icons/127167843383902209/69eb12cdc37b84bea0ae384153b9b715.png?size=256',
          cover:
            'https://cdn.discordapp.com/splashes/127167843383902209/b2e561a9604bf25689e18477254558c5.jpg?size=1024',
          invite_code: getInviteCode()
        },
        {
          uuid: getUuid(),
          name: 'RuneScape',
          creator_id: 1,
          type: 'public',
          avatar: 'https://cdn.discordapp.com/icons/303835144073248770/50605e0ea8423847ad41a1a83c887c64.png?size=256',
          cover:
            'https://cdn.discordapp.com/splashes/303835144073248770/982ef30542ad9991afebba7c8aa6503f.jpg?size=1024',
          invite_code: getInviteCode()
        },
        {
          uuid: getUuid(),
          name: 'Rainbow 6',
          creator_id: 1,
          type: 'public',
          avatar: 'https://cdn.discordapp.com/icons/253581140072464384/ee8c89ba74afe869865e85ecc3cf55e0.png?size=256',
          cover:
            'https://cdn.discordapp.com/splashes/253581140072464384/e839a44e76556672880ee0551bbd84f5.jpg?size=1024',
          invite_code: getInviteCode()
        },
        {
          uuid: getUuid(),
          name: 'For Honor',
          creator_id: 1,
          type: 'public',
          avatar: 'https://cdn.discordapp.com/icons/275420710170525697/3bb04e4da88ae388b03bd12351aeedc2.png?size=256',
          cover:
            'https://cdn.discordapp.com/splashes/275420710170525697/294d6e4c30003f3a6d4213e92b3c3c9b.jpg?size=1024',
          invite_code: getInviteCode()
        }
      ])
    })
}
