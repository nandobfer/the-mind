class Player():
    def __init__(self, id, table):
        self.id = id
        self.table = table
        self.cards = table.deck.draw()

        table.players.append(self)

    def play(self, value):
        for card in self.cards:
            if card.value == value:

                self.table.cards.append(card)
                self.cards.remove(card)

                break
