const { validationResult } = require('express-validator')
var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/userModel')

const JWT_SECRET = "JWTSECRET"

exports.signup = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(422).json({
            success: false,
            error: errors.array()[0].msg
        })
    } else {
        const { username } = req.body

		User.findOne({ username })
			.exec((error, user) => {
				if (error) {
					return res.status(500).json({
						success: false,
						error: error.message
					})
				}

				if (user) {
					return res.status(400).json({
						success: false,
						error: 'Username already exists!'
					})
				}

				const requestUser = new User(req.body)
				const token = jwt.sign(
					{ _id: requestUser._id },
					JWT_SECRET
				)

				res.cookie('token', token, {
					expire: new Date() + 60
				})

				requestUser.save((error, user) => {
					if (error) {
						return res.status(500).json({
							success: false,
							error: error.message
						})
					}

					if (user) {
						res.json({
							token: token,
							user: user
						})
					}
				})
			})
    }

}


exports.signin = async (req, res) => {
    const errors = validationResult(req)

	const { username, password } = req.body

    if (!errors.isEmpty()) {
        res.status(422).json({
            success: false,
            error: errors.array()[0].msg
        })
    } else {

        User.findOne({ username })
			.exec((error, user) => {
				if (error || !user) {
					return res.status(400).json({
						success: false,
						message: 'User not found!'
					})
				}

				bcrypt.compare(password, user.password, (error, result) => {
					if (result == true) {
						const token = jwt.sign(
							{ _id: user._id },
							JWT_SECRET
						)

						res.cookie('token', token, {
							expire: new Date() + 60
						})

						return res.status(200).json({
							token,
							user
						})
					} else {
						return res.status(401).json({
							success: false,
							error: "Username and/or password does not match!"
						})
					}
				})
			})

    }

}



exports.alluser = async (req, res) => {
	User.find()
		.exec((error, users) => {
			if (error) {
				return res.status(500).json({
					success: false,
					error: error.message
				})
			}

			if (users) {
				return res.status(200).json({
					success: true,
					data: users
				})
			}
		})
}



exports.signout = async (req, res) => {
    res.clearCookie('token')
    return res.status(200).json({
        success: true,
        message: "Successfully signed out!"
    })
}