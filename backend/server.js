const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const todoRoutes = require("./routes/todoRoutes");
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

app.listen(3000, () => {
  console.log("🚀 Backend running on http://localhost:3000");
});
