const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

router.get('/', (req, res) => {
    res.render('post')
})


router.post('/', async (req, res) => {
    let { title, content, date_created, user_id } = req.body;
    try {
        let createNewPost = await Post.create({
            title: title,
            content: content,
            date_created: date_created,
            user_id: user_id
        })

        // redirect to dashboard with new post below
        res.redirect('/')
    }
    catch (err) {
        console.log(err)
        // res.status(400).json({ message: err.message })
        res.render('/')
    }
})

// showing new post
router.get('/:id', async (req, res) => {
    // render with findByPk
    try {
        let newPost = await Post.findByPk(req.params.id)
        // add new post handlebars
        res.render('show', { post: newPost })
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err.message })
    }
})

// show clicked post for editing
router.get('/:id', async (req, res) => {
    const editPost = await Post.findByPk(req.params.id)
    res.render('edit', { post: post })
})

// update the post /title, content, date_created, user_id/
router.put('/:id', async (req, res) => {
    let { title, content, date_created, user_id } = req.body;
    try {
        let updateNewPost = await Post.update({
            title: title,
            content: content,
            date_created: date_created,
            user_id: user_id
        }, {
            where: {
                id: req.params.id
            }
        })
        // res.status(200).json(updateNewPost)
        // redirect to dashboard with new post below
        res.redirect('/')
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ message: err.message })
        res.render('/')
    }
})

// delete post
router.delete('/:id', async (req, res) => {
    try {
        await Post.destroy({
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