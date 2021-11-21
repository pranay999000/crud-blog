var expressJwt = require('express-jwt')

const JWT_SECRET = 'JWTSECRET'

exports.isSignedIn = expressJwt({
	secret: JWT_SECRET,
	algorithms: ['HS256'],
	getToken: function fromCookie (req) {
		let token = req.cookies.token
		if (token) {
			return token;
		} 
		return null;
	}
})