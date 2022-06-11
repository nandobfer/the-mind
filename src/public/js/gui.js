export default function createGameInterface($, game) {
    
    const { state } = game;
    
    const $playedCards = $('#playedCards')
    const $myCards = $('#myCards')
    const $card = $('.game-card').eq(0)

    const $status = $('#status')
    const $players = $('#players')
    const $player = $('.player-container').eq(0)
    
    function renderLevelInfo() {
        const { level } = state

        $status.find('#level').text(level.number)
        $status.find('#health').text(level.health)
        $status.find('#shuriken').text(level.shuriken)
    }

    function renderPlayers() {
        const { players } = state
        $players.html('')

        for (let playerId in players) {
            const player = players[playerId]
            const $newPlayer = $player.clone()

            $newPlayer.attr('id', 'player-container-' + playerId)
            $newPlayer.find('.player-name').text(playerId)
            $newPlayer.find('.player-cards').text(player.cards)

            if (player.willing) {
                $newPlayer.addClass('willing')
            } else {
                $newPlayer.addClass('text-bg-dark')
            }

            $players.append($newPlayer)
        }
    }

    function renderPlayedCards() {
        const { played } = state
        $playedCards.html('')

        for (let card of played) {
            const { number, isGood } = card
            const $newCard = $card.clone()

            $newCard.attr('id', 'card-number-' + number)
            $newCard.find('.card-number').text(number)
            if (!isGood) {
                $newCard.addClass('bad-card')
            }
            $playedCards.append($newCard)
        }
    }

    function renderMyCards() {
        const { me } = state
        $myCards.html('')

        for (let i in me.cards) {
            const cardNumber = me.cards[i]
            const $newCard = $card.clone()

            $newCard.attr('id', 'card-number-' + cardNumber)
            $newCard.data('number', cardNumber)
            $newCard.find('.card-number').text(cardNumber)
            
            $newCard.on('click', function () {
                const cardNumber = $(this).data('number')
                game.onClickMyCard(cardNumber)
            })

            $newCard.addClass('my-card')
            if (me.willing == cardNumber) {
                $newCard.addClass('willing')
            }

            $myCards.append($newCard)
        }
    }

    function renderLayout() {

        renderLevelInfo()
        renderPlayers()
        renderPlayedCards()
        renderMyCards()
        
        game.subscribe('onChangeLevel', renderLevelInfo)
        game.subscribe('onChangePlayers', renderPlayers)
        game.subscribe('onChangeMyCards', renderMyCards)
        game.subscribe('onChangePlayedCards', renderPlayedCards)
    }

    return {
        renderLayout
    }
}