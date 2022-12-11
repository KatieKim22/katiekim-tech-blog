const router = require('express').Router();
const withAuth = require('../utils/auth')
const { User, Post, Comment } = require('../models');

// GET home(index) page
router.get('/', async (req, res) => {
    const posts = await Post.findAll(
        { limit: 10, order: [['date_created', 'DESC']] })
    res.render('home', { post: posts })
})

// after login, redirect to dashboard
router.get('/:id', async (req, res) => {
    console.log('logged in')
    try {
        let dashboard = await User.findOne({
            where: { id: req.session.user_id },
            attributes: [
                'id',
                'userName'
            ],
            include: [
                {
                    model: Post,
                    attributes: ['title', 'content', 'date_created']
                }
            ]
        })
        res.render('dashboard', { dashboard })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})






module.exports = router;