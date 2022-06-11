function createSocketConnection() {
    const socket = io();

    const observers = {
        onSetup: [],
    }

    socket.on('connect', () => {
        console.log('Connected with ID ' + socket.id)
    })

    socket.on('setup', (state) => {
        notify('onSetup', state)
    })

    socket.on('add-player', (player) => {
        notify('onNewPlayer', player)
    })

    socket.on('remove-player', (playerId) => {
        notify('onRemovePlayer', playerId)
    })

    function subscribe(event, observerFunction) {
        if (typeof observerFunction === "function") {
            if (observers[event] !== undefined) {
                observers[event].push(observerFunction);
            } else {
                throw new Error("Socket event " + event + " not found")
            }
        }
    }

    function notify(event) {
        if (observers[event] === undefined)
            return;

        for (const observerFunction of observers[event]) {
            typeof observerFunction === "function" &&
                observerFunction()
        }
    }

    return {
        subscribe,
        socket
    }
}