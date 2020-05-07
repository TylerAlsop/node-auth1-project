const bcrypt = require ("bcryptjs")

const express = require("express")
const router = express.Router()

const Users = require("./users/usersModel");


router.get("/", (req, res) => {
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
