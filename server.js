const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Handle WebSocket connections
let players = [];

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("join", (name) => {
        if (players.length < 20) {
            players.push({ id: socket.id, name });
            io.emit("updatePlayers", players);
        } else {
            socket.emit("full", "Game is full!");
        }
    });

    socket.on("disconnect", () => {
        players = players.filter((p) => p.id !== socket.id);
        io.emit("updatePlayers", players);
        console.log("A user disconnected:", socket.id);
    });
});

// Start the server
server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
