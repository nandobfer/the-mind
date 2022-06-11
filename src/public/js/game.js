export default function createGame() {
    const observers = {
        onChangePlayers: [],
        onChangeLevel: [],
        onChangeMyCards: [],
        onChangePlayedCards: []
    };

    let state = {
        players: {
            'alice': {
                cards: 4,
                willing: false,
            },
            'bob': {
                cards: 3,
                willing: false,
            },
        },
        me: {
            playerId: 'alucin0gen',
            cards: [
                8 , 42, 65, 100
            ],
            willing: null,
        },
        played: [
            { number: 1, isGood: true }
        ],
        level: {
            number: 4,
            health: 3,
            shuriken: 2,
        }
    }

    function setState(newState) {
        state = newState
    }

    function setLevel(level) {
        state.level = level
        notify('onChangeLevel')
    }

    function addPlayer(playerId) {
        const newPlayer = {
            cards: 0,
            willing: false
        }

        state.players[playerId] = newPlayer
        notify('onChangePlayers')
    }

    function removePlayer(playerId) {
        delete state.players[playerId]
        notify('onChangePlayers')
    }

    function updatePlayerCards(playerId, numberOfCards) {
        if (state.players[playerId]) {
            state.players[playerId].cards = numberOfCards;
            notify('onChangePlayers')
        }
    }

    function drawCards(cardsNumbers) {
        state.me.cards = [
            ...state.me.cards,
            ...cardsNumbers
        ]
        notify('onChangeMyCards')
    }

    function resetCards() {
        state.me.cards = []
        notify('onChangeMyCards')
    }

    function playCard(playedCardNumber) {
        const myCards = state.me.cards
        const i = myCards.findIndex(n => n == playedCardNumber)
        if (i > -1) {
            state.played = state.played
                .map(({ number, isGood }) => {
                    return {
                        number,
                        isGood: isGood ? number < playedCardNumber : isGood
                    }
                })
            state.played.push({
                number: playedCardNumber,
                isGood: true
            })
            notify('onChangePlayedCards')
            
            delete state.me.cards[i]
            notify('onChangeMyCards')
        }
    }

    function onClickMyCard(cardNumber) {
        if (!cardNumber) return;

        if (state.me.willing == cardNumber) {
            playCard(cardNumber)
            state.me.willing = null
        } else {
            state.me.willing = cardNumber
        }

        notify('onChangeMyCards')
        // emit to server
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
                observerFunction()
        }
    }

    return {
        state,
        setState,
        setLevel,
        addPlayer,
        removePlayer,
        updatePlayerCards,
        playCard,
        drawCards,
        resetCards,
        subscribe,
        onClickMyCard,
    }
}