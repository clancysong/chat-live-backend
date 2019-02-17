import { Server } from 'ws'

interface PlayerInfo {
  id: string
  x: number
  y: number
}

const playersInfo: PlayerInfo[] = []

const EVENT_TYPE = {
  INIT_OTHER_PLAYERS: 'init other players',
  CREATE_PLAYER: 'create player',
  PLAYER_MOVEMENT: 'player movement',
  ADD_OTHER_PLAYER: 'add other player',
  REMOVE_PLAYER: 'remove player'
}

const generateId = () => `player-${new Date().getTime()}`

const updatePlayerInfo = (playerInfo: PlayerInfo) => {
  playersInfo.forEach((item, index) => {
    if (item.id === playerInfo.id) playersInfo[index] = playerInfo
  })
}

const removePlayerInfo = (playerInfo: PlayerInfo) => {
  playersInfo.splice(playersInfo.findIndex(item => item.id === playerInfo.id), 1)
}

const bindEvents = (wss: Server) => {
  wss.on('connection', function connection(ws) {
    const sendMessage = (type: string, body: any) => ws.send(JSON.stringify({ type, body }))

    const broadcast = (type: string, body: any) => {
      wss.clients.forEach(client => {
        if (client !== ws) {
          client.send(JSON.stringify({ type, body }))
        }
      })
    }

    const newPlayerInfo = { id: generateId(), x: 500, y: 400 }

    sendMessage(EVENT_TYPE.CREATE_PLAYER, newPlayerInfo)
    sendMessage(EVENT_TYPE.INIT_OTHER_PLAYERS, playersInfo)
    broadcast(EVENT_TYPE.ADD_OTHER_PLAYER, newPlayerInfo)

    playersInfo.push(newPlayerInfo)

    ws.on('message', (message: string) => {
      const data = JSON.parse(message)

      switch (data.type) {
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
