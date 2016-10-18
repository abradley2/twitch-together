export const GET_AUTHORIZATION_URL = 'CurrentUserActions.GET_AUTHORIZATION_URL'
export const AUTHORIZE = 'CurrentUserActions.AUTHORIZE'
export const GET_CURRENT_USER = 'CurrentUserActions.GET_CURRENT_USER'

export const creators = {
	/**
	 * GET_AUTHORIZATION_URL
	 * Requests that the server send a url that the
	 * user can use to navigate to twitch authorization.
	 * Once returned, "authorizationUrl" string will
	 * be added to CurrentUser.
	 * 
	 * When the user is redirected back to this app
	 * from twitch authorization, CurrentUser will
	 * be preloaded with the "authorizationCode" 
	 * attribute, allowing the user to login.
	 */
	[GET_AUTHORIZATION_URL]: function () {

		return {
			type: GET_AUTHORIZATION_URL,
			request: {
				method: 'GET',
				url: '/api/twitchAuth/getAuthorizationUrl'
			}
		}
	},

	/**
	 * AUTHORIZE
	 * Use the "authorizationCode" attribute on CurrentUser
	 * to login. Result extends the CurrentUser object with
	 * a UserModel.
	 * 
	 * This does not need to be called manually. This is
	 * called in the "DOMContentLoaded" event callback 
	 * (see main.js)
	 * if the authorizationCode is preloaded onto the CurrentUser
	 * object as a result of a redirect.
	 */
	[AUTHORIZE]: function (authorizationCode) {

		return {
			type: AUTHORIZE,
			request: {
				method: 'POST',
				url: '/api/twitchAuth/authorize',
				data: {
					code: authorizationCode
				}
			}
		}
	},

	/**
	 * Used to check if the user is still logged in.
	 * Adds boolean loggedIn to the CurrentUser object. 
	 * If loggedIn is true, then also extends the 
	 * current user object with a UserModel. If so,
	 * it is not necessary to retrieve the UserModel
	 * via authorize (as the user is still considered to
	 * be logged in)
	 */
	[GET_CURRENT_USER]: function () {

		return {
			type: GET_CURRENT_USER,
			request: {
				method: 'GET',
				url: '/api/currentuser'
			}
		}
	}
}
