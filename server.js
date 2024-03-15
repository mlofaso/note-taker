const fs = require("fs");
const path = require("path");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const db = require("./db/db.json");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/api/notes", (req, res) => {
  res.json(db);
});

app.post("/api/notes", (req, res) => {
  const newNote = {
    id: uuidv4(),
    ...req.body,
  };

  const updatedArray = db.push(newNote);

  fs.writeFile("./db/db.json", JSON.stringify(updatedArray), (err, result) => {
    if (err) throw err;
    console.log("note added");
  });

  res.json("note added");
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});
