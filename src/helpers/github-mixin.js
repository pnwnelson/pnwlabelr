import app from 'ampersand-app'

export default {
	ajaxConfig () { // this is sending an authorization header with the token in it (required by Github)
		return {
			headers: {
				'Authorization': 'token ' + app.me.token // this should allow us to make a fetch call on the me.js model
			}
		}
	}
}