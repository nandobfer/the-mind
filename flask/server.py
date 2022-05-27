from flask import Flask, request


app = Flask(__name__)

users = []


@app.route('/connect/', methods=['POST'])
def connect():
    global users
    user = request.form['user']
    if not user in users:
        users.append(user)
    else:
        return 'user already connected, try again'

    return str(users)


@app.route('/disconnect/', methods=['POST'])
def disconnect():
    global users
    user = request.form['user']
    if user in users:
        users.remove(user)

    return 'disconnected'


@app.route('/reset/', methods=['GET'])
def reset():
    global users
    users = []
    return 'users reseted'


@app.route('/users/', methods=['GET'])
def users_url():
    global users
    return str(users)


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="80")
