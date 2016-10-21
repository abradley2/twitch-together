export const GET_USER_GROUPS = 'GroupActions.GET_USER_GROUPS'
export const GET_GROUPS = 'GroupActions.GET_GROUPS'

export const creators = {

	[GET_USER_GROUPS]: function () {
		return {
			type: GET_USER_GROUPS,
			request: {
				type: 'GET',
				url: '/api/groups'
			}
		}
	},

	[GET_GROUPS]: function () {
		return {
			type: GET_GROUPS,
			request: {
				type: 'GET',
				url: '/api/groups'
			}
		}
	}
}
