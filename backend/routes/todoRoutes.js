const express = require("express");
const router = express.Router();
const connection = require("../db");

// GET all todos
router.get("/", (req, res) => {
  const sql = "SELECT * FROM todos ORDER BY id DESC";
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error fetching todos:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// POST a new todo
router.post("/", (req, res) => {
  const { title, description, status } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const sql = "INSERT INTO todos (title, description, status) VALUES (?, ?, ?)";
  connection.query(sql, [title, description || "", status || "pending"], (err, result) => {
    if (err) {
      console.error("❌ Error inserting todo:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // return the inserted todo
    res.json({
      id: result.insertId,
      title,
      description: description || "",
      status: status || "pending"
    });
  });
});

// PUT to update a todo status
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const sql = "UPDATE todos SET title = ?, description = ?, status = ? WHERE id = ?";
  connection.query(sql, [title, description, status, id], (err) => {
    if (err) {
      console.error("❌ Error updating todo:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Todo updated successfully" });
  });
});

// DELETE a todo
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM todos WHERE id = ?";
  connection.query(sql, [id], (err) => {
    if (err) {
      console.error("❌ Error deleting todo:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Todo deleted successfully" });
  });
});

module.exports = router;
