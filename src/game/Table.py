from src.config import config
from src.game.Deck import Deck


class Table():
    def __init__(self):
        self.deck = Deck()
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
