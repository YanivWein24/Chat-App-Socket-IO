const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const router = require('./router.js')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js')

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    // the "socket" object is being sent from the client every time a we do 'socket.emit'
    console.log(`User Connected: ${socket.id}`);

    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room })
        // 'addUser' can return either a user or an error
        if (error) return callback(error)
        socket.join(user.room)
    })

    // get called from the client using 'socket.disconnect()'
    socket.on('disconnect', () => {
        console.log(`${socket.id} has disconnected`)
    })
});

app.use(router)

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})