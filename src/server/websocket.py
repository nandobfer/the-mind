from flask import Flask, request, render_template, send_from_directory
from flask_socketio import SocketIO, emit
import os

app = Flask(__name__, static_folder='../public')
sockets = SocketIO(app)


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

# End of socketio events configuration


if __name__ == "__main__":
    sockets.run(app, debug=True, host="0.0.0.0", port=5000)
