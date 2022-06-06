from src.config import config
from src.game.Card import Card
import random

class Deck():
    def __init__(self):
        self.number = config['start']['cards']
        self.cards = None
        self.build()

    def build(self):
        ''' defines an empty list and populates it with the number of cards in config file '''
        self.cards = []
        for i in range(self.number):
            card = Card(i+1)
            self.cards.append(card)
            self.shuffle()
            
    def shuffle(self):
        ''' shuffle self.cards list '''
        random.shuffle(self.cards)

    def draw(self):
        ''' removes certain quantity of cards from the deck and return the removed cards in a list '''
        cards = []
        for i in range(self.level):
            cards.append(self.cards.pop(0))
            
        return cards
    
    