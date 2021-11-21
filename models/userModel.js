const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

var userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            required: true
        }
    },
    { timestamps: true }
)

userSchema.pre('save', function save(next) {
    const user = this
    if (!user.isModified('password')) {
        return next()
    }

    bcrypt.genSalt(10, (error, salt) => {
        if (error) {
            return next(error)
        }

        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) {
                return next(error)
            }
            user.password = hash
            next()
        })
    })
})

module.exports = mongoose.model('User', userSchema, 'user')