const router = require('express').Router();
const { Comment, Post, User } = require('../../models');

router.get('/', (req, res) => {
    res.render('show')
})

router.post('/', async (req, res) => {
    let { text, user_id } = req.body;
    try {
        let newComment = await Comment.create({
            text: text,
            date_created: date_created,
            user_id: req.session.user_id
        })
        res.redirect('/')
    } catch (err) {
        res.render('/')
    }
})


router.delete('/:id', async (req, res) => {
    try {
        await Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})

module.exports = router;