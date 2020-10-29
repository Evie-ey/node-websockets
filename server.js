var express = require('express');
var app = express();
// var expressWs = require('express-ws')(app);
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const cors = require('cors');
var uuidv4 = require('uuid').v4;

let requests = []

app.use(cors());
const message = {
  "id": "2efff104-a640-43b6-549b-08d879923d62",
  "initiator": "Evelyne Namwoyo",
  "initiatorId": "a8366738-5dad-451b-8e70-f86810d6f037",
  "initiatorEmail": "evelyne@laboremus.no",
  "participantId": "6527ae7e-09c6-4c8f-ac2f-a60685efe720",
  "receivedAt": "2020-10-26T12:33:47.4529644",
  "submittedAt": "2020-10-26T12:33:47.7311262",
  "receivedFromNira": "2020-10-26T12:33:48.331357",
  "billingUpdated": "2020-10-26T12:33:50.0216534",
  "requestStatus": "Completed",
  "surname": "NANSIKOMBI",
  "givenNames": "ROSE",
  "cardNumber": "000078675",
  "maskedCardNumber": "00007****",
  "nin": "CM88456101R55E",
  "maskedNin": "CM8845********",
  "dateOfBirth": "2020-10-04T00:00:00",
  "resultJson": {
    "matchingStatus": null,
    "cardStatus": null,
    "status": "Error",
    "error": {
      "code": "320",
      "message": "Person not found, NIN: CM88456101R55E"
    },
    "isError": true,
    "ninStatus": "Person not found, NIN: CM88456101R55E"
  }
}


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
