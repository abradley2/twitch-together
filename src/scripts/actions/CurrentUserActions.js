export const AUTHORIZE = 'CurrentUserActions.AUTHORIZE'
export const GET_SESSION = 'CurrentUserActions.GET_SESSION'
export const LOGIN = 'CurrentUserActions.LOGIN'
export const LOGOUT = 'CurrentUserActions.LOGOUT'

export const creators = {
	[LOGIN]: function (authorizationCode) {
		console.log('dispatch login')
		return {
			type: LOGIN,
			request: {
				method: 'POST',
				url: '/api/twitch/login',
				data: {
					code: authorizationCode
				}
			}
		}
	},
	[GET_SESSION]: function () {
		return {
			type: GET_SESSION,
			request: {
				method: 'GET',
				url: '/api/currentuser/session'
			}
		}
	},
	[AUTHORIZE]: function () {
		return {
			type: AUTHORIZE,
			request: {
				method: 'GET',
				url: '/api/twitch/authorize'
			}
		}
	},
	[LOGOUT]: function () {
		return {
			type: LOGOUT
		}
	}
}
