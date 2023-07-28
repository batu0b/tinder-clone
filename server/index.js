const express = require("express");
const cors = require("cors");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/imgs", express.static(path.join(__dirname, "/public/images")));

const corsOption = {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  exposedHeaders: ["x-auth-token"],
};
app.use(cors(corsOption));

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
mongoose
  .connect(
    "mongodb+srv://tinderclone:1234567890@cluster0.zfdimhp.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log("working on 3001");
});
