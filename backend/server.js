const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("api is running");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const newChat = chats.find((chat) => chat._id === id);
  res.send(newChat);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
