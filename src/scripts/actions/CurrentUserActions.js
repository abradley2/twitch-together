export const GET_CURRENT_USER = 'CurrentUserActions.GET_CURRENT_USER'
export const SET_LOCATION = 'CurrentUserActions.SET_LOCATION'

export const creators = {

	[SET_LOCATION]: function (position) {

		return {
			type: SET_LOCATION,
			request: {
				method: 'PUT',
				url: '/api/currentuser',
				data: {
					location: [
						position.coords.longitude,
						position.coords.latitude
					]
				}
			}
		}
	},

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
