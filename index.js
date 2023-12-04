import http from "http";
import { configuration } from "./app/config.js";
import { app } from "./app/index.js";
import { connect } from "./app/database.js";
import { Server } from "socket.io";

const { port } = configuration.server;

// Connect to database
connect();

// Create server
const server = http.createServer(app);

// Create socket
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Listen socket
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });

  socket.on("mensaje", (payload) => {
    console.log("Mensaje recibido: ", payload);
    io.emit("mensaje", payload);
  });
});

server.listen(port, () => {
  console.log(`Server running at ${port} port`);
});
