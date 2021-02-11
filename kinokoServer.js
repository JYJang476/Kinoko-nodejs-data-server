const express = require('express');
const http = require('http').createServer(express);

const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credential: true 
    }
});

io.on('connection', function(sock) {
    console.log('connect');
    sock.emit('msg', "123");

    sock.on('message', (data) => {
        console.log('data ', data);
    });
});





