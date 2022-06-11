export function createSocketConnection(game) {
    const socket = io();

    socket.on('connect', () => {
        console.log('Connected with ID ' + socket.id)
    })

    socket.on('setup', (state) => {
        game.setState(state)
    })

    socket.on('add-player', (player) => {
        game.addPlayer(player)
    })

    socket.on('card-card', (player) => {
        game.addPlayer(player)
    })


    return {
        socket
    }
}