
//? Templates for the server code

// import express from 'express';
// import http from 'http';
// import cors from 'cors';
// import { Server } from 'socket.io';

// const PORT = 9000;
// const app = express();
// app.use(cors());

// const server = http.createServer(app);
// const io = new Server(server, {
//     // connectionStateRecovery: {},
//     cors: {
//         origin: 'http://localhost:5173',            //? change it to your frontend url
//         credentials: true
//     }
// })

// io.on('connection', (socket) => {
//     console.log(`User connected: ${socket.id}`);
//     socket.emit('welcome', 'Welcome to the server!');
// })

// app.get('/', (req, res) => {
//     res.send('Server is running');
// })

// server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))


//? uncomment it for the html code
// import express from 'express';
// import path from 'path';
// import http from 'http';
// import { Server } from 'socket.io'

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//     connectionStateRecovery: {}
// });

// app.use(express.static(path.resolve('./public')))

// io.on('connection', (socket) => {
//     console.log(`User connected: ${socket.id}`);

//     socket.on('send-message', (message) => {
//         io.emit('receive-message', message);
//     })
// })

// app.get('/', (req, res) => {
//     res.sendFile('./public/index.html');
// })

// server.listen(9000, () => console.log('Server is running on port 9000'))