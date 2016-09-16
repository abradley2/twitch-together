export const LOGIN = 'CurrentUserActions.LOGIN'
export const LOGOUT = 'CurrentUserActions.LOGOUT'

export const creators = {
	[LOGIN]: function () {
		return {
			type: LOGIN,
			request: '/api/twitch/getauth'
		}
	},
	[LOGOUT]: function () {
		return {
			type: LOGOUT
		}
	}
}
