export const LOGOUT = 'TwitchAuthActions.LOGOUT'

export const creators = {
	[LOGOUT]: function () {
		return {
			type: LOGOUT
		}
	}
}
