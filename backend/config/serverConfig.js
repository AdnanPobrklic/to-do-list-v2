const http = require("http");
const express = require("express");
const cors = require("cors");
const { initializeSocket } = require("../sockets/socketManager");
const todoRoutes = require("../routes/todoRoutes");

const configureServer = (app) => {
    const server = http.createServer(app);
    const port = process.env.PORT || 3000;
    const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

    app.use(express.json());
    app.use(
        cors({
            origin: clientUrl,
            methods: ["GET", "POST", "PATCH", "DELETE"],
            credentials: true,
        })
    );

    app.use("/api", todoRoutes);

    return { server, port };
};

const startServer = (server, port) => {
    server.listen(port, () => {
        initializeSocket(server);
    });
};

module.exports = { configureServer, startServer };
