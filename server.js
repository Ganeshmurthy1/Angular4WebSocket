const express = require('express'),
      app = express(),
      server = require('http').createServer(app),
      io = require('socket.io')(server),
      bodyParser = require('body-parser');


let sockets = new Set();
  

app.use(express.static(__dirname + '/dist')); 
app.use(bodyParser()); 

/*Socket Start */
io.on('connection', socket => {
  sockets.add(socket); 
 
  io.sockets.emit('alert',{message : "New User is added"})
  socket.on('message', function (data) {
     io.sockets.emit('message',data);    
  });

  socket.on('disconnect', () => { 
    sockets.delete(socket); 
  });

});
/**Socket End */


 

server.listen(3000);
console.log('Visit http://localhost:3000 in your browser');
