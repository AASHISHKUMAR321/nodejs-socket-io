'use strict';

let express = require('express');
let http = require('http');
const app = express();

const PORT = 3000;

function startSocketServer(httpServer){
  let io = require('socket.io')(httpServer);

  io.on('connection', function(socket){
    console.log('socket connection established');

    socket.on('channel_name', function(msg) {
      console.log('message received from client : ', msg);
      socket.emit('channel_name','ACK:OK');
    });

    socket.on('disconnect',function(){
      console.log('socket connection closed');
    });

  });
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

let server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}!`);
  startSocketServer(server);
}); 
