const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",  // Allow all origins for testing purposes
        methods: ["GET", "POST"]
    }
});

let players = {};
let games = {};  // A container for all active games

// Handle WebSocket connections
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("join", (name) => {
        players[socket.id] = { id: socket.id, name, game: null };
        io.emit("updatePlayers", players); // Broadcast new player list
    });

    socket.on("selectGame", (game) => {
        // Logic to assign players to a game
        if (!games[game]) {
            games[game] = { players: [] };
        }
        games[game].players.push(players[socket.id]);
        players[socket.id].game = game;

        // Start the game when there are enough players
        if (games[game].players.length >= 2) {
            // Start the game logic
            io.emit("gameStarted", game);
        }
    });

    socket.on("disconnect", () => {
        delete players[socket.id];
        io.emit("updatePlayers", players);
        console.log("A user disconnected:", socket.id);
    });
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
