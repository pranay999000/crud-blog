const mongoose = require('mongoose')

var blogSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Blog', blogSchema, 'blog')