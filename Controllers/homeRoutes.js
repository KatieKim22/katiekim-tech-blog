const router = require('express').Router();
const withAuth = require('../utils/auth')
const { User, Post, Comment } = require('../models');

// GET home(index) page
router.get('/', async (req, res) => {
    const posts = await Post.findAll(
        { limit: 10, order: [['date_created', 'DESC']] })
    res.render('home', { post: posts })
})



// after login, dashboard
router.get('/:id', withAuth, async (req, res) => {
    const userData = await User.findOne({ where: { id: req.params.id } });
    const posts = await Post.findAll(
        { where: { user_id: req.params.id }, limit: 10, order: [['date_created', 'DESC']] })
    res.render('dashboard', { user: userData, post: posts })
})




module.exports = router;