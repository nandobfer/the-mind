from flask import Flask, request, render_template, send_from_directory
from flask_socketio import SocketIO, emit
import os

app = Flask(__name__, static_folder='../public')
io = SocketIO(app)

rooms = {}
users = {}

UPDATES_INTERVAL = 1

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

def send_available_rooms():
    global UPDATES_INTERVAL
    global rooms
    global users
    while (True):
        if (request.sid in users):
            if ('lobby' in users[sid]['status']):
                emit('updateAvailableRooms', rooms, to=request.sid)
                io.sleep(UPDATES_INTERVAL)


@io.on('connect')
def connect():
    global users
    users[request.sid] = {
	    'status': 'lobby'
    }
    io.start_background_task(target=send_available_rooms)
    print("[CLIENT CONNECTED]:", request.sid)


@io.on('disconnect')
def disconnect():
    global users
    users.remove(request.sid)
    print("[CLIENT DISCONNECTED]:", request.sid)


@io.on('notifyUserJoined')
def notifyUserJoined(user):
    emit('notifyUserJoined', user, broadcast=True, skip_sid=request.sid)


@io.on('notifyUserLeft')
def notifyUserLeft(user):
    emit('notifyUserLeft', user, broadcast=True, skip_sid=request.sid)

@io.on('createNewRoom')
def createNewRoom(data):
    global rooms
    global users
    rooms[data['roomId']] = [data['user']]
    users[request.sid]['status'] = 'awaiting'

# End of socketio events configuration


if __name__ == "__main__":
    io.run(app, debug=True, host="0.0.0.0", port=5000)
