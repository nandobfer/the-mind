from flask import Flask, request, render_template, send_from_directory
from flask_socketio import SocketIO, emit
import os
from src.game.Table import Table

table = Table()

app = Flask(__name__, static_folder='../public')
sockets = SocketIO(app, ping_interval=1)


def bigPrint(text):
    print()
    print()
    print(text)
    print()
    print()


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    '''Serve a files at src/public directory. Can be updated to run a React App'''
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

# Start of socketio events configuration
# request.sid = client session id, used to identify the client


@sockets.on('connect')
def onConnect():
    sid = request.sid

    player = table.newPlayer(sid)
    state = table.getState(sid)
    bigPrint(f'connected: {sid}')
    bigPrint(state)

    sockets.emit('setup', state, to=sid)
    player = {
        'playerId': sid,
        'cards': len(player.cards),
        'willing': player.is_willing
    }
    sockets.emit('add-player', player)


@sockets.on('disconnect')
def onDisconnect():
    sid = request.sid
    table.removePlayer(sid)

    print(f'disconnected {sid}')
    sockets.emit('remove-player', sid)

    # End of socketio events configuration
# if __name__ == "__main__":
sockets.run(app, debug=True, host="0.0.0.0", port=80)
