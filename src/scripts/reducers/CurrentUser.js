import { pick, defer } from 'underscore'
import { List, Map, fromJS } from 'immutable'
import { setupReducer } from '../utils/fn'
import {
	GET_CURRENT_USER,
	SET_LOCATION,
} from '../actions/CurrentUserActions'

const initialState = fromJS({
	twitchId: null,
	twitchName: null,
	email: null,
	location: [0, 0],
	groups: [],
	belongsTo: [],
	events: [],
	goingTo: []
})

var CurrentUser = setupReducer(initialState)
	.on(GET_CURRENT_USER, function (oldState, action) {

		if (action.request.status === 'done') {
			let res = action.response

			return oldState.merge(fromJS(
				pick(res,
					'twitchId',
					'twitchName',
					'location',
					'email',
					'groups',
					'belongsTo',
					'events',
					'goingTo'
				)
			))

		} else {

			return oldState
		}
	})
	.on(SET_LOCATION, function (oldState, action) {

		if (action.request.status === 'done') {
			let res = action.response

			return oldState.set('location',
				oldState.get('location')
					.set(0, action.response.location[0])
					.set(1, action.response.location[1])
			)
		} else {

			return oldState
		}
	})
	.create()

export default CurrentUser
