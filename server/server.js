const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const router = require('./router.js')
const { addUser, removeUser, getUser, getUsersInRoom, users } = require('./users.js')

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
        const { error, newUser } = addUser({ id: socket.id, name, room })
        console.log("new user", newUser)
        // 'addUser' can return either a user or an error
        if (error) return callback(error)

        socket.emit('message', { user: 'Admin', text: `Hello ${newUser.name}, Welcome to room ${newUser.room}` })
        socket.broadcast.to(newUser.room).emit('message', { user: 'Admin', text: `${newUser.name} has joined` })
        // send a message to all members in the room
        socket.join(newUser.room)

        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        console.log("user", user)
        io.to(user.room).emit('message', { user: user.name, text: message })
        callback()
    });

    // get called from the client using 'socket.disconnect()'
    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if (user) io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left` })
        console.log(`${socket.id} has disconnected`)
    })
});

app.use(router)

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})