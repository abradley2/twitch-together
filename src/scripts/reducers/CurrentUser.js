import { pick, defer } from 'underscore'
import { List, Map, fromJS } from 'immutable'
import { generate as genId } from 'shortid'
import { setupReducer } from '../utils/fn'
import {
	GET_CURRENT_USER
} from '../actions/CurrentUserActions'

const initialState = fromJS({
	twitchId: null,
	twitchName: null,
	email: null,
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
	.create()

export default CurrentUser