
const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const PORT = process.env.PORT || 3001;

// SQLite setup
const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) return console.error(err.message);
  console.log("Connected to SQLite DB.");
});

// Basic API
app.get("/api/health", (_, res) => {
  res.json({ status: "OK" });
});

// Serve frontend from Vercel
app.use(express.static(path.join(__dirname, "../dist")));
app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
