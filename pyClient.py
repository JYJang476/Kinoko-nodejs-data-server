import socketio

io = socketio.Client()

io.connect('http://localhost:3001')

@io.on("connect")
def pondero():
    print("connect")

@io.on("msg")
def msg():
    print("msg")
