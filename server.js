const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {

  console.log("User Connected");

  socket.on("send-message", (data) => {

    io.emit("receive-message", data);

  });

  socket.on("typing", (name) => {

    socket.broadcast.emit("show-typing", name);

  });

  socket.on("disconnect", () => {

    console.log("User Disconnected");

  });

});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});