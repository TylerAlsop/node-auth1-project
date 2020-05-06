const express = require("express")

const router = express.Router()

const Users = require("./usersModel")


router.get("/", (req, res) => {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });

module.exports = router
