import { Server as WebSocketServer } from 'ws'

interface PlayerInfo {
  id: string
  x: number
  y: number
}

class PlayerSocket {
  private EVENT_TYPE = {
    INIT_OTHER_PLAYERS: 'init other players',
    CREATE_PLAYER: 'create player',
    PLAYER_MOVEMENT: 'player movement',
    ADD_OTHER_PLAYER: 'add other player',
    REMOVE_PLAYER: 'remove player'
  }

  private wss: WebSocketServer
  private playersInfo: PlayerInfo[] = []

  constructor(wss: WebSocketServer) {
    this.wss = wss
    this.bindEvents()
  }

  private generateId = () => `player-${new Date().getTime()}-${this.playersInfo.length}`

  private updatePlayerInfo = (playerInfo: PlayerInfo) => {
    this.playersInfo.forEach((item, index) => {
      if (item.id === playerInfo.id) this.playersInfo[index] = playerInfo
    })
  }

  private removePlayerInfo = (playerInfo: PlayerInfo) => {
    this.playersInfo.splice(this.playersInfo.findIndex(item => item.id === playerInfo.id), 1)
  }

  private bindEvents = () => {
    const _this = this
    _this.wss.on('connection', function connection(ws) {
      const sendMessage = (type: string, body: any) => ws.send(JSON.stringify({ type, body }))

      const broadcast = (type: string, body: any) => {
        _this.wss.clients.forEach(client => {
          if (client !== ws) {
            client.send(JSON.stringify({ type, body }))
          }
        })
      }

      const newPlayerInfo = { id: _this.generateId(), x: 500, y: 400 }

      sendMessage(_this.EVENT_TYPE.CREATE_PLAYER, newPlayerInfo)
      sendMessage(_this.EVENT_TYPE.INIT_OTHER_PLAYERS, _this.playersInfo)
      broadcast(_this.EVENT_TYPE.ADD_OTHER_PLAYER, newPlayerInfo)

      _this.playersInfo.push(newPlayerInfo)

      ws.on('message', (message: string) => {
        const data = JSON.parse(message)

        switch (data.type) {
          case _this.EVENT_TYPE.PLAYER_MOVEMENT: {
            _this.updatePlayerInfo(data.body)
            broadcast(_this.EVENT_TYPE.PLAYER_MOVEMENT, data.body)
            break
          }

          case _this.EVENT_TYPE.REMOVE_PLAYER: {
            _this.removePlayerInfo(data.body)
            broadcast(_this.EVENT_TYPE.REMOVE_PLAYER, data.body)
            break
          }

          default: {
            throw new Error('Type Error')
          }
        }
      })
    })
  }
}

export default PlayerSocket
