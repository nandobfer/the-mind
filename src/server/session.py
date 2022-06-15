class Session():

    id = -1

    def __init__(self):
        self.connections = []

    def connect(self, ip, sid, player):
        id = self.newId()
        self.connections.append(
            Client(self, ip=ip, sid=sid, id=id, player=player))

    def getConnections(self):
        connections = []
        for connection in self.connections:
            data = {
                'id': connection.id,
                'ip': connection.ip,
                'sid': connection.sid,
                'name': connection.name
            }
            connections.append(data)

        print(connections)
        return connections

    def disconnect(self, ip):
        ''' Function to disconnect given client from server '''
        for client in self.connections:
            if client.ip == ip:
                client.disconnect()
                break

    def newId(self):
        self.id += 1
        return self.id

    def getClient(self, sid=None):
        for connection in self.connections:
            if connection.sid == sid:
                return connection


class Client():
    def __init__(self, session, ip=None, sid=None, id=None, name='Ninguém', player=None):
        self.session = session
        self.ip = ip
        self.id = id
        self.sid = sid
        self.name = name
        self.player = player

    def disconnect(self):
        ''' Function to disconnect this client from the server'''
        self.session.id -= 1
        self.session.connections.remove(self)
