function createGameInterface($, game, socket) {
    
    const $playedCards = $('#playedCards')
    const $myCards = $('#myCards')
    const $card = $('.game-card').eq(0)

    const $status = $('#status')
    const $players = $('#players')
    const $player = $('.player-container').eq(0)
    
    function renderLevelInfo(state) {
        const { level } = state

        $status.find('#level').text(level.number)
        $status.find('#health').text(level.health)
        $status.find('#shuriken').text(level.shuriken)
    }

    function renderPlayers(state) {
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

    function renderPlayedCards(state) {
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

    function renderMyCards(state) {
        const { me } = state
        $myCards.html('')

        for (let i in me.cards) {
            const { number, isGood } = me.cards[i]
            const $newCard = $card.clone()

            $newCard.attr('id', 'card-number-' + number)
            $newCard.data('number', number)
            $newCard.find('.card-number').text(number)
            
            // $newCard.on('click', function () {
            //     const cardNumber = $(this).data('number')
            // })

            $newCard.addClass('my-card')
            if (me.willing == cardNumber) {
                $newCard.addClass('willing')
            }

            if (!isGood) {
                $newCard.addClass('bad-card')
            }

            $myCards.append($newCard)
        }
    }

    $.fn.disableSelection = function() {
        return this
            .attr('unselectable', 'on')
            .css('user-select', 'none')
            .on('selectstart', false);
    };

    (function init() {

        $('#table').disableSelection();
        
        game.subscribe('onChangeLevel', renderLevelInfo)
        game.subscribe('onChangePlayers', renderPlayers)
        game.subscribe('onChangeMyCards', renderMyCards)
        game.subscribe('onChangePlayedCards', renderPlayedCards)
    })()

    return {}
}