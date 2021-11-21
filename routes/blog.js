const express = require('express')
const { isSignedIn } = require('../middlewares/authMiddleware')

const router = express()

const {
    createBlog,
    readBlog,
    updateBlog,
    deleteBlog
} = require('../controllers/blogController')

router.post('/blog/create', isSignedIn, createBlog)
router.get('/blogs', isSignedIn, readBlog)
router.put('/blog/update/:blogId', updateBlog)
router.delete('/blog/delete/:blogId', deleteBlog)

module.exports = router