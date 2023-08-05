const express = require("express");
const cors = require("cors");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat");
const messageRoutes = require("./routes/message");
const mongoose = require("mongoose");
const path = require("path");
const { Server } = require("socket.io");
const http = require("http");

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const server = http.createServer(app);
app.use("/imgs", express.static(path.join(__dirname, "/public/images")));

const corsOption = {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  exposedHeaders: ["x-auth-token"],
};
app.use(cors(corsOption));

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

const io = new Server(server, {
  cors: {
    origin: " http://localhost:3000",
    methods: ["GET", "POST"],
  },
  maxHttpBufferSize: 5e6,
});

mongoose
  .connect(
    "mongodb+srv://tinderclone:1234567890@cluster0.zfdimhp.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));

io.on("connection", (socket) => {
  socket.on("join chat", (room) => {
    socket.join(room);
  });
  socket.on("new message", ({ newMessage, room }) => {
    socket.to(room).emit("message recieved", newMessage);
  });
});

server.listen(5000, () => {
  console.log("working on 5000");
});
