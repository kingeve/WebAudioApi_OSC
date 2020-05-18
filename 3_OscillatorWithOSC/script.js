//define express server
var express = require('express');
var app = express();
//create http 
var http = require('http');
var fs = require('fs');
//define socket io
var socketIO = require('socket.io');
var server = http.Server(app);
var io = socketIO(server);
//load dgram
var dgram =require('dgram');
//load osc library
var osc =require('osc-min') ;

var remoteOscIp;

app.get('/', function(req,res){
  fs.readFile(__dirname + '/index.html', function(error, content) {
    if(error) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(content);

  });
});

//RECEIVE the OSC messages from Max
//open udpServer
var udpServer=dgram.createSocket('udp4',function(msg,rinfo){
  var oscMessage;
  oscMessage = osc.fromBuffer(msg); 
  remoteOscIp=rinfo.address;
  console.log((oscMessage.args[0].value));
  io.emit('osc',{ 
    //Send the received osc messages to the socket
      //y is the amplitude value, accordingly float(0~1).
    x:parseInt(oscMessage.args[0].value) || 0,
    y:parseFloat(oscMessage.args[1].value) || 0
  })
});

server.listen(8000);
console.log('Starting HTTP server on TCP port 8000');
udpServer.bind(9998);
console.log('Starting UDP server on UDP port 9998');
