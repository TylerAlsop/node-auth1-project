const bcrypt = require ("bcryptjs")

const express = require("express")
const router = express.Router()

const Users = require("../routers/usersModel");

router.post("/register", (req, res) => {
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

router.post("/login", (req, res) => {
    const {username, password} = req.body


    Users.findBy({ username })
        .then(([user]) => {
            console.log("User", user)
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = {
                    id: user.id,
                    username: user.username,
                }

                res.status(200).json({Welcome: user.username})
            } else {
                res.status(401).json({
                    message: "Your Credentials Are Invalid. MVP says that I need to have: You shall not pass!"
                })
            }
        })
        .catch(error => {
            res.status(500).json({ errorMessge: "Error Finding The User."})
    })
});

router.get("/logout", (req, res) => {
    if(req.session) {
        req.session.destroy( error => {
            if(error) {
                res.status(500).json({
                    message: "Error logging out."
                })
            } else {
                res.status(200).json({
                    message: "You Have Logged Out Successfully."
                })
            }
        })
    } else {
        res.status(200).json({
            message: "You Are Already Logged Out."
        })
    }
})

module.exports = router;
