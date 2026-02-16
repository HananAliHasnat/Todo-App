const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "rootpassword",
  database: process.env.DB_NAME || "todo_db"
});


connection.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
    process.exit(1); // stop backend if DB fails
  }
  console.log("✅ Connected to MySQL database");
});

module.exports = connection;
