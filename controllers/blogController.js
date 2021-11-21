const Blog = require('../models/blogModel')
const User = require('../models/userModel')


exports.createBlog = async (req, res) => {
    try {
        const blog = new Blog(req.body)

        User.findById(req.user._id)
            .exec((error, user) => {
                if (error) {
                    return res.status(500).json({
                        success: false,
                        error: error.message
                    })
                }

                if (user && user.isAdmin) {
                    blog.save((error, blog) => {
                        if (error) {
                            return res.status(500).json({
                                success: false,
                                error: error.message
                            })
                        }

                        if (blog) {
                            return res.status(201).json({
                                success: true,
                                message: 'Saved blog in DB!'
                            })
                        }
                    })
                } else {
                    return res.status(400).json({
                        success: false,
                        error: 'Only admin can create blog! '
                    })
                }
            })
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        })
    }
}


exports.readBlog = async (req, res) => {
    Blog.find()
        .exec((error, blogs) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    error: error.message
                })
            }

            if (blogs) {
                return res.status(200).json({
                    success: true,
                    data: blogs
                })
            }
        })
}


exports.updateBlog = async (req, res) => {
    User.findById(req.user._id)
        .exec((error, user) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    error: error.message
                })
            }

            if (user && user.isAdmin) {
                Blog.findByIdAndUpdate(
                    { _id: req.params.blogId },
                    { $set: req.body },
                    { new: true, useFindAndModify: false }
                ).exec((error, blog) => {
                    if (error) {
                        return res.status(500).json({
                            success: false,
                            error: error.message
                        })
                    }

                    if (blog) {
                        return res.status(201).json({
                            success: true,
                            message: 'Blog updated successfully'
                        })
                    }
                })
            } else {
                return res.status(400).json({
                    success: false,
                    error: 'Only admin can update blog!',
                })
            }
        })
}


exports.deleteBlog = async (req, res) => {
    User.findById(req.user._id)
        .exec((error, user) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    error: error.message
                })
            }

            if (user && user.isAdmin) {
                Blog.findByIdAndDelete(req.params.blogId)
                    .exec((error, blog) => {
                        if (error) {
                            return res.status(500).json({
                                success: false,
                                error: error.message
                            })
                        }

                        if (blog) {
                            return res.status(201).json({
                                success: true,
                                message: 'Blog deleted successfully!'
                            })
                        }
                    })
            } else {
                return res.status(400).json({
                    success: false,
                    error: 'Only admin can delete blog!',
                })
            }
        })
}