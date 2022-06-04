from flask import Flask, request
from game.Table import Table

app = Flask(__name__)

table = Table()


@app.route('/table_status/', methods=['POST'])
def table_status():
    ''' send the table level, health and shurikens '''
    global table

    data = {
        "level": table.level,
        "health": table.health,
        "shurikens": table.shurikens
    }

    return data


@app.route('/table_cards/', methods=['POST'])
def table_cards():
    ''' send the cards that are currently on the  table '''
    global table

    data = {"card": table.cards}

    return data


@app.route('/player_cards/', methods=['POST'])
def player_cards():
    ''' send the cards in player's hand, as well as the quantity of cards in each other player's hands '''
    global table

    friends = []

    id = request.form['id']
    for item in table.players:
        if item.id == id:
            player = item
        else:
            friends.append(item)

    data = {
        "cards": player.cards
    }

    for item in friends:
        data.update({f"cards_{friends.index(item)}": len(item.cards)})

    return data


@app.route('/players/', methods=['GET'])
def players_url():
    ''' sends the players that currently are on the table '''
    global table

    # data = {}
    # for player in table.players:
    #     data.update({player.id: {}})

    return table.players


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="80")
