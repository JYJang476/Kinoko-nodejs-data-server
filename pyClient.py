import socketio

io = socketio.Client()

@io.event
def connect():
    print("connect")
    io.emit("res_image", {"fff": 123})
    
io.connect('http://localhost:3003')
io.wait()
#io.disconnect()