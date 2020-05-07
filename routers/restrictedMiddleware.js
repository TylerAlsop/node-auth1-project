const bcrypt = require("bcryptjs")

module.exports = (req, res, next) => {
    if (req.session && req.session.user) {
        next()
    } else {
        res.status(401).json({
            you: "You are not authorized. MVP says that I need to have: You shall not pass!"
        })
    } 
}
