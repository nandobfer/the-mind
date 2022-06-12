function createSocketConnection() {
    const socket = io({
        ping_interval: 1
    });

    const observers = {
        onSetup: [],
        onNewPlayer: [],
        onRemovePlayer: [],
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

    function notify(event, data) {
        if (observers[event] === undefined)
            return;

        for (const observerFunction of observers[event]) {
            typeof observerFunction === "function" &&
                observerFunction(data)
        }
    }

    return {
        id: socket.id,
        emit: socket.emit,
        subscribe,
    }
}