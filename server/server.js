import express from 'express';
import cors from 'cors'
import { Server } from 'socket.io';
import { createServer } from 'http';

const app = express();
const server = createServer(app);
const socketio = new Server(server);

app.get('/', (req, res) => res.send('API is running...'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})