import os
from flask import Flask, request, render_template, send_from_directory
from flask_socketio import SocketIO, emit
from src.game.Table import Table
from src.server.session import Session

table = Table()
session = Session()

app = Flask(__name__, static_folder='../../frontend/dist')
sockets = SocketIO(app, ping_interval=1)


def bigPrint(*args):
    print()
    print()
    for text in args:
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
    ip = request.remote_addr

    player = table.newPlayer(sid)
    session.connect(ip, sid, player)
    state = table.getState(sid)

    bigPrint(f'connected: {ip} - {sid}', state)

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
    ip = request.remote_addr

    player = session.getClient(sid).player
    table.removePlayer(player)

    session.disconnect(ip)
    print(f'disconnected {sid}')
    sockets.emit('remove-player', sid)

    # End of socketio events configuration


@app.route('/connections/', methods=['GET'])
def getConnections():
    connections = session.getConnections()
    return str(connections)+'\n'


sockets.run(app, debug=True, host="0.0.0.0", port=5000)
