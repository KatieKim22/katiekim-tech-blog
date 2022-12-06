// user routes - for login, log-out, register
const router = require('express').Router();
const bcrypt = require("bcrypt");

// assign variables with models
const { User } = require('../../models');

router.get('/', async (req, res) => {
    res.render("sign_up")
})

router.post('/', async (req, res) => {
    const { userName, password } = req.body;
    console.log("Hello Hello", req.body);
    try {

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("hassed PW", hashedPassword);

        const createUser = await User.create({ userName: userName, password: hashedPassword })
        return res.redirect('/')


    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err.message })
    }
})




module.exports = router;