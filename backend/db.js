const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "app_user",
  password: "YourStrongPassword",
  database: "todo_db"
});

db.connect(err => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
    return;
  }
  console.log("MySQL connected");
});

module.exports = db;
