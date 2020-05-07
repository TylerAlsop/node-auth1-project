const bcrypt = require ("bcryptjs")

const express = require("express")
const router = express.Router()

const Users = require("./users/usersModel");

router.post("/", (req, res) => {
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


module.exports = router;
