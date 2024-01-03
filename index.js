const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversation")
const messageRoute = require("./routes/message")
const router = express.Router();
const path = require("path");
const connect = require("./utils/db");
const cors = require("cors");
const initializeSocket = require("./socket");

dotenv.config();
initializeSocket(); 
connect(); 
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute); 
app.use("/api/messages", messageRoute)

app.get('/.well-known/pki-validation/4D6B578FBEDCD71FD6C7B5C4FECE606C.txt', (req, res) =>  {
  res.sendFile('/home/ubuntu/chat-app-socket/api/4D6B578FBEDCD71FD6C7B5C4FECE606C.txt')
})

const port = 8800; 
app.listen(port, () => {
  console.log( `Backend server is running! on port ${port}`);
});
