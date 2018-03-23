const express = require('express'),
      app = express(),
      server = require('http').createServer(app),
      io = require('socket.io')(server),
      bodyParser = require('body-parser');


let timerId = null,
    sockets = new Set();

//This example emits to individual sockets (track by sockets Set above).
//Could also add sockets to a "room" as well using socket.join('roomId')
//https://socket.io/docs/server-api/#socket-join-room-callback

app.use(express.static(__dirname + '/dist')); 
app.use(bodyParser()); 
io.on('connection', socket => {

  sockets.add(socket);
  console.log(`Socket ${socket.id} added`);

  if (!timerId) {
    //startTimer();
  }
app.get('/',function(req,res){
  res.send("HI");
})
app.post('/message', function(req, res) {
  for (const s of sockets) {
           s.emit('data', { data: req.body.text });
          }
          console.log(req.body.text)
    res.sendStatus(200)
});
  socket.on('clientdata', data => {y
    console.log(data);
  });

  socket.on('disconnect', () => {
    console.log(`Deleting socket: ${socket.id}`);
    sockets.delete(socket);
    console.log(`Remaining sockets: ${sockets.size}`);
  });

});

// function startTimer() {
//   //Simulate stock data received by the server that needs 
//   //to be pushed to clients
//   timerId = setInterval(() => {
//     if (!sockets.size) {
//       clearInterval(timerId);
//       timerId = null;
//       console.log(`Timer stopped`);
//     }
//     let value = ((Math.random() * 50) + 1).toFixed(2);
//     //See comment above about using a "room" to emit to an entire
//     //group of sockets if appropriate for your scenario
//     //This example tracks each socket and emits to each one
//     for (const s of sockets) {
//       console.log(`Emitting value: ${value}`);
//       s.emit('data', { data: value });
//     }

//   }, 2000);
// }

server.listen(3000);
console.log('Visit http://localhost:3000 in your browser');
