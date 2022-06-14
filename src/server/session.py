class Session():
    def __init__(self):
        self.connections = []
        self.connections_json = []

    def connect(self, ip, sid):
        self.connections_json.append({'ip': ip, 'sid': sid})
        self.connections.append(Client(ip, sid))


class Client():
    def __init__(self, ip, sid):
        self.ip = ip
        self.sid = sid
