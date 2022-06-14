from src.config import config
from src.game.Deck import Deck
from src.game.Player import Player


class Table():
    def __init__(self):
        self.deck = Deck(self)
        self.level = config['start']['level']
        self.shurikens = config['start']['shurikens']
        self.health = config['start']['health']
        self.cards = []
        self.players = []

    def nextLevel(self):
        ''' increment shurikens and health if advanced to matching level '''
        self.level += 1

        if self.level in config.health_bonus:
            self.health += 1
        elif self.level in config.shuriken_bonus:
            self.shurikens += 1

    def isGood(self):
        ''' -1*deu ruim? '''
        last_card_index = len(self.cards) - 1

        if self.cards[last_card_index].value < self.cards[last_card_index-1].value:
            return False
        else:
            return True

    def newPlayer(self, sid):

        player = Player(sid, self)

        self.players.append(player)

        return player

    def removePlayer(self, sid):
        for player in self.players:
            if player.id == sid:
                self.players.remove(player)
                for card in player.cards:
                    self.deck.cards.append(card)

    def getState(self, sid):
        player = None
        friends = []
        player_cards = []
        played = []
        for card in self.cards:
            data = {
                'number': card.value,
                'isGood': card.is_good
            }
            played.append(data)

        for item in self.players:
            if item.id == sid:
                player = item
                for card in player.cards:
                    data = {
                        'number': card.value,
                        'isGood': card.is_good
                    }

                    player_cards.append(data)
            else:
                friends.append(item)

        # friends = [player for player in self.players if not sid in player.id]

        state = {}
        players = {}
        for player in friends:
            players.update({
                player.id: {
                    'cards': len(player.cards),
                    'willing': player.is_willing
                }
            })

        me = {
            'playerId': player.id,
            'cards': player_cards,
            'willing': player.card
        }

        level = {
            'number': self.level,
            'health': self.health,
            'shuriken': self.shurikens
        }

        state.update({'players': players})
        state.update({'me': me})
        state.update({'played': played})
        state.update({'level': level})

        return state
