const express = require("express");
const cors = require("cors");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

const app = express();
const corsOption = {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
};

app.use(cors(corsOption));
app.use(express.json());
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.listen(3001, () => {
  console.log("working on 3001");
});
