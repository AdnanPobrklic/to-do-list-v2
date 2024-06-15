require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const { configureServer, startServer } = require("./config/serverConfig");

const app = express();
const { server, port } = configureServer(app);

connectDB()
    .then(() => {
        startServer(server, port);
    })
    .catch((err) => {
        console.error(`Error starting server: ${err.message}`);
    });
