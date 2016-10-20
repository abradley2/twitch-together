export const GET_CURRENT_USER = 'CurrentUserActions.GET_CURRENT_USER'

export const creators = {

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
