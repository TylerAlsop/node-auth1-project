const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session")

// const usersRouter = require("../users/users_router.js");
// const authRouter = require("../auth/authRouter")
// const restricted = require("../auth/restricted_middleware")

const server = express();

const sessionConfig = {
  name: "Cookie Monster",
  secret: "Keep it secret, keep it safe!",
  cookie: {
    // This is information for both the cookie and the session
    maxAge: 1000 * 60 * 60,
    secure: false, // Should be true during prodeuction. To send only over https
    httpOnly: true, // true means no access from JS

  },
  resave: false,
  saveUninitialized: true, // GDPR laws require to check with client 
  ///*** I think the teacher said that if the client chooses not to accept you collecting cookies then this value needs to be changed to false.

}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig))

// server.use("/api/users", restricted, usersRouter);
// server.use("/api/auth", authRouter);


server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
