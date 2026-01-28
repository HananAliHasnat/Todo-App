const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all todos
router.get("/", (req, res) => {
  db.query("SELECT * FROM todos", (err, results) => {
    if (err) return res.status(500).json({ error: err });

    console.log(results); // <-- DEBUG: shows all records in terminal
    res.json(results);
  });
});

// Create todo
router.post("/", (req, res) => {
  const { title, description } = req.body;

  db.query(
    "INSERT INTO todos (title, description) VALUES (?, ?)",
    [title, description],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });

      console.log("Inserted ID:", results.insertId); // <-- DEBUG
      res.json({ message: "Todo created", id: results.insertId });
    }
  );
});

// Update todo status
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  db.query(
    "UPDATE todos SET status = ? WHERE id = ?",
    [status, id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });

      res.json({ message: "Todo updated" });
    }
  );
});

// Delete todo
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM todos WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    res.json({ message: "Todo deleted" });
  });
});

module.exports = router;
