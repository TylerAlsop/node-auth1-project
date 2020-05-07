const bcrypt = require ("bcryptjs")

const express = require("express")
const router = express.Router()


const Users = require("./users/usersModel");

router.post("/", (req, res) => {
    const userData = req.body
    const ROUNDS = process.env.HASHING_ROUNDS  || 8
    const hash = bcrypt.hashSync(userData.password, ROUNDS)

    userData.password = hash

    Users.add(userData)
        .then(user => {
            res.json(user);
        })
        .catch(err => res.send(err));
});

module.exports = router;
