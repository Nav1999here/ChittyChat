const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleWare");

const chatRoutes = require("./routes/chatRoutes");

const app = express();
dotenv.config();
connectDB();
app.use(express.json()); //to accept json data

app.get("/", (req, res) => {
  res.send("api is running");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use(notFound);
app.use(errorHandler);

// app.get("/api/chat", (req, res) => {
//   res.send(chats);
// });

// app.get("/api/chat/:id", (req, res) => {
//   console.log(req.params);
//   const { id } = req.params;
//   const newChat = chats.find((chat) => chat._id === id);
//   res.send(newChat);
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`.blue.bold);
});
