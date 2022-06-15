import createSocketConnection from './modules/socket.js'
import createGame from './modules/game'
import createGameInterface from './modules/gui.js'

export default function initTable() {
    const socket = createSocketConnection()
    const game = createGame(socket)
    createGameInterface(game, socket)
}