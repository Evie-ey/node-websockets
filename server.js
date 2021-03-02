var express = require('express');
var app = express();
// var expressWs = require('express-ws')(app);
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const cors = require('cors');
var uuidv4 = require('uuid').v4;

let requests = []

app.use(cors());

io.on('connection', function (socket) {
  socket.on('event://send-request', function (ninReq) {
    console.log("got", ninReq);

    const payload = JSON.parse(ninReq);
    [...requests, payload]

    socket.broadcast.emit('event://get-request', ninReq);
  })
});

http.listen(5000, function () {
  console.log('listening on *:5000');
});
