const onlineUsers = new Map();
let io;

function initializeSocket(server) {
    io = require("socket.io")(server, {
        cors: {
            origin: process.env.CLIENT_URL || "http://localhost:5173",
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        socket.on("connectionMade", (userId) => {
            onlineUsers.set(userId, socket.id);
        });

        socket.on("disconnect", () => {
            for (const [userId, socketId] of onlineUsers) {
                if (socketId === socket.id) {
                    onlineUsers.delete(userId);
                    break;
                }
            }
        });
    });
}

module.exports = {
    initializeSocket,
    getIo: () => io,
    onlineUsers,
};
