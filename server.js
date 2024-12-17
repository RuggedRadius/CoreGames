const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",  // Allow all origins for testing purposes, adjust for production
        methods: ["GET", "POST"]
    }
});

// Serve static files from 'public'
app.use(express.static(path.join(__dirname, "public")));

// Player data
let players = {};

// Handle WebSocket connections
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Initialize the player
    socket.on("join", (name) => {
        players[socket.id] = { id: socket.id, name, x: Math.random() * 500, y: Math.random() * 500 };
        io.emit("updatePlayers", players); // Broadcast new player list
    });

    // Handle player movement
    socket.on("move", (data) => {
        if (players[socket.id]) {
            players[socket.id].x = data.x;
            players[socket.id].y = data.y;
            io.emit("updatePlayers", players); // Update all players
        }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        delete players[socket.id];
        io.emit("updatePlayers", players);
        console.log("A user disconnected:", socket.id);
    });
});

// Start server on port 3000
server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
