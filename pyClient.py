import socketio

io = socketio.Client()

@io.event
def connect():
    print("connect")
    io.emit("res_image", {"fff": 123})
    
io.connect('http://172.26.3.62:3001')
io.wait()
#io.disconnect()