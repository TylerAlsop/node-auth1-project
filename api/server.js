const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session")

const usersRouter = require("../routers/users/usersRouter.js");
const registerRouter = require("../routers/registerRouter")
const loginRouter = require("../routers/loginRouter")
const logoutRouter = require("../routers/logoutRouter")

const restricted = require("../routers/restrictedMiddleware")

const server = express();

const sessionConfig = {
  name: "Cookie Monster. Because Why Not?",
  secret: "Keep it secret, keep it safe!",
  cookie: {

    maxAge: 1000 * 60 * 60,
    secure: false, 
    httpOnly: true, 

  },
  resave: false,
  saveUninitialized: true, 
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig))

server.use("/api/users", restricted, usersRouter);
server.use("/api/register", registerRouter)
server.use("/api/login", loginRouter)
server.use("/api/logout", logoutRouter)

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong.",
	})
})


server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
