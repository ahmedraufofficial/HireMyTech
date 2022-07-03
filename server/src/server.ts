import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { connect, disconnect, getActiveUsers } from './models/user';


const app = express();

const server = http.createServer(app);

const io = new Server(server, {cors: {origin: "http://localhost:3000"}});

io.on("connection", (socket) => {
    socket.join("room");

    socket.on("handle-connection", (username: string) => {
        if (!connect(socket.id, username)) {
            socket.emit("user-already-created");
        } else {
            socket.emit("user-created");
            io.to("room").emit("get-active-users", getActiveUsers())
        }
    })

    socket.on("send-message", (message) => {
        socket.broadcast.to("room").emit("request", message)
    });

    socket.on("disconnect", () => {
        disconnect(socket.id);
    })
});

server.listen(5000, () => {
    console.log("Server running on port 5000")
}); 