import Ws from 'App/Services/Ws'

Ws.start((socket) => {
  console.log(socket.id)
})
