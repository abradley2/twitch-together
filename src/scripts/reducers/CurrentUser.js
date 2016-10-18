import {List, Map, fromJS} from 'immutable'
import {pick} from 'underscore'
import {generate as genId} from 'shortid'
import {
	GET_CURRENT_USER,
	GET_AUTHORIZATION_URL,
	AUTHORIZE
} from '../actions/CurrentUserActions'

const initialState = Map({
	loggedIn: null,
	authorizationCode: null,
	authorizationUrl: null,
	twitchId: null,
	twitchName: null,
	email: null,
	groups: null,
	belongsTo: null,
	events: null,
	goingTo: null
})

export default function (state = initialState, action) {

	switch (action.type) {

		case GET_AUTHORIZATION_URL:
			if (action.request.status === 'done') {

				return state.merge({
					authorizationUrl: action.response.authorizationUrl
				})
			} else {

				return state
			}

		case GET_CURRENT_USER:
			if (action.request.status === 'done') {
				let res = action.response

				return state.merge( fromJS(
					pick(res, 
						'loggedIn', 
						'twitchId',
						'twitchName',
						'email',
						'groups',
						'belongsTo',
						'events',
						'goingTo'
					)
				) )

			} else {

				return state
			}

		case AUTHORIZE:
			if (action.request.status === 'done') {
				let res = action.response

				return state.merge( fromJS(
					pick(res, 
						'loggedIn', 
						'twitchId',
						'twitchName',
						'email',
						'groups',
						'belongsTo',
						'events',
						'goingTo'
					)
				) )

			} else {

				return state
			}

		default:
			return state
	}

}
