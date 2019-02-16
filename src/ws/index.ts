import { Server } from 'ws'

interface PlayerInfo {
  id: string
  x: number
  y: number
}

const playersInfo: PlayerInfo[] = []

const EVENT_TYPE = {
  OTHER_PLAYERS: 'other players',
  NEW_PLAYER: 'new player',
  PLAYER_MOVEMENT: 'player movement',
  REMOVE_PLAYER: 'remove player'
}

const updatePlayerInfo = (playerInfo: PlayerInfo) => {
  playersInfo.forEach(item => {
    if (item.id === playerInfo.id) item = playerInfo
  })
}

const removePlayerInfo = (playerInfo: PlayerInfo) => {
  playersInfo.splice(playersInfo.findIndex(item => item.id === playerInfo.id), 1)
}

const bindEvents = (wss: Server) => {
  wss.on('connection', function connection(ws) {
    const broadcast = (type: string, body: any) => {
      wss.clients.forEach(client => {
        if (client !== ws) {
          client.send(JSON.stringify({ type, body }))
        }
      })
    }

    ws.send(JSON.stringify({ type: EVENT_TYPE.OTHER_PLAYERS, body: playersInfo }))

    ws.on('message', (message: string) => {
      const data = JSON.parse(message)

      console.log(data.type)

      switch (data.type) {
        case EVENT_TYPE.NEW_PLAYER: {
          playersInfo.push(data.body)
          broadcast(EVENT_TYPE.NEW_PLAYER, data.body)
          break
        }

        case EVENT_TYPE.PLAYER_MOVEMENT: {
          updatePlayerInfo(data.body)
          broadcast(EVENT_TYPE.PLAYER_MOVEMENT, data.body)
          break
        }

        case EVENT_TYPE.REMOVE_PLAYER: {
          removePlayerInfo(data.body)
          broadcast(EVENT_TYPE.REMOVE_PLAYER, data.body)
          break
        }

        default: {
          throw new Error('Type Error')
        }
      }
    })
  })
}

export default bindEvents
