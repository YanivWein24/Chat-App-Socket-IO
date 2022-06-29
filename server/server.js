import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import { createServer } from 'http'
import router from './router.js'

const app = express()
const server = createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
    console.log("New connection")

    socket.on('disconnect', () => {
        console.log("User left")
    })
})

app.use(router)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})