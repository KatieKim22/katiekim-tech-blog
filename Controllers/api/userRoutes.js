// user routes - for login, log-out, register
const router = require('express').Router();
const bcrypt = require("bcrypt");
const { RuleTester } = require('eslint');
// assign variables with models
const { User, Post } = require('../../models');


router.get('/', async (req, res) => {
    res.render("log_in")
});



// login
router.post('/', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { userName: req.body.userName } });

        console.log(userData)
        if (!userData) {
            return res.status(400).send('Cannot find user');
        }


        const validPassword = await bcrypt.compare(req.body.password, userData.password)

        if (!validPassword) {
            return res.status(400).send('Please try again!');
        }

        else {
            // check below for session. userData?
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.logged_in = true;

                // change directory, redirect to dashboard
                console.log('userID: ', userData.id)

                res.redirect(`/${userData.id}`)
            });
        }
    }
    catch (err) {
        res.status(400).json(err);
    }
});



router.post('/logout', (req, res) => {
    try {
        if (req.session.logged_in) {
            req.session.destroy(() => {
                res.redirect('home')
            }
            )
        } else {
            res.status(404).end()
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

module.exports = router;