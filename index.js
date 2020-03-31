const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = 8080;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('chat message', (msg, username) => {
        console.log(username+' says: '+msg);
        io.emit('chat message', msg, username);
    })

    socket.on('writing on', (username) => {
        io.emit('writing on', username);
    })

    socket.on('writing off', (username) => {
        io.emit('writing off', username);
    })
});

http.listen(PORT, () => {
    console.log(`CHAT SERVER HAS BEEN STARTED ON PORT ${PORT}`);
});