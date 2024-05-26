require("dotenv").config();
const http = require("http");
const { initializeSocket } = require("./sockets/socketManager");
const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const dbUri = process.env.DB_URI || "mongodb://localhost:27017";
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
const todoRoutes = require("./routes/todoRoutes");
const cors = require("cors");

console.log(clientUrl);
app.use(express.json());
app.use(
    cors({
        origin: clientUrl,
        methods: ["GET", "POST", "PATCH", "DELETE"],
        credentials: true,
    })
);

mongoose
    .connect(dbUri)
    .then(() => {
        server.listen(port, () => {
            initializeSocket(server);
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

app.use("/api", todoRoutes);
