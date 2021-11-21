const express = require('express')
const { check } = require('express-validator')
const { isSignedIn } = require('../middlewares/authMiddleware')

const router = express()

const {
    createBlog,
    readBlog,
    updateBlog,
    deleteBlog
} = require('../controllers/blogController')

router.post(
    '/blog/create',
    [
        check('title', 'Title must be 6 characters long').isLength({ min: 6 }),
        check('content', 'Content must be 8 characters long').isLength({ min: 8 })
    ],
    isSignedIn,
    createBlog
)

router.get('/blogs', isSignedIn, readBlog)
router.put(
    '/blog/update/:blogId',
    [
        check('title', 'Title must be 6 characters long').isLength({ min: 6 }),
        check('content', 'Content must be 8 characters long').isLength({ min: 8 })
    ],
    isSignedIn,
    updateBlog
)
router.delete('/blog/delete/:blogId', isSignedIn, deleteBlog)

module.exports = router