import Ws from 'App/Services/Ws'

Ws.start((socket) => {
  socket.on('create', (room) => {
    socket.join(room)
  })
})
