function createGame(socket) {
    const observers = {
        onChangePlayers: [],
        onChangeLevel: [],
        onChangeMyCards: [],
        onChangePlayedCards: []
    };

    let state = {}

    function setState(newState) {
        state = newState
        notifyAll()
    }

    function setLevel(level) {
        state.level = level
        notify('onChangeLevel')
    }

    function addPlayer(player) {
        const { playerId } = player;
        state.players[playerId] = player
        notify('onChangePlayers')
    }

    function removePlayer(playerId) {
        delete state.players[playerId]
        notify('onChangePlayers')
    }

    function subscribe(event, observerFunction) {
        if (typeof observerFunction === "function") {
            if (observers[event] !== undefined) {
                observers[event].push(observerFunction);
            } else {
                throw new Error("Game event " + event + " not found")
            }
        }
    }

    function notify(event) {
        if (observers[event] === undefined)
            return;

        for (const observerFunction of observers[event]) {
            typeof observerFunction === "function" &&
                observerFunction(state)
        }
    }

    function notifyAll() {
        for (const event of Object.keys(observers)) {
            notify(event)
        }
    }

    (function init() {
        socket.subscribe('onSetup', setState)
        socket.subscribe('onNewPlayer', addPlayer)
        socket.subscribe('onRemovePlayer', removePlayer)
    })()

    return {
        subscribe,
    }
}