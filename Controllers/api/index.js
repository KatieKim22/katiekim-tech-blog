const router = require('express').Router();

const signupRoutes = require('./signupRoutes');
const commentRoutes = require('./commentRoutes');
const postRoutes = require('./postRoutes');
const userRoutes = require('./userRoutes');

router.use('/signup', signupRoutes);
router.use('/comment', commentRoutes);
router.use('/post', postRoutes);
router.use('/user', userRoutes);

module.exports = router;