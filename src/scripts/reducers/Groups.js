import { List, Map, fromJS } from 'immutable'
import { setupReducer } from '../utils/fn'
import {
	GET_USER_GROUPS,
	GET_GROUPS,
} from '../actions/GroupActions'

const initialState = Map({
	userGroups: List([]),
	groups: List([])
})

var Groups = setupReducer(initialState)
	.on(GET_USER_GROUPS, function (oldState, payload) {

		if (action.request.status === 'done') {

			return oldState.set('userGroups', fromJS(action.response))
		} else {

			return oldState
		}
	})
	.on(GET_GROUPS, function (oldState, payload) {

		if (action.request.status === 'done') {

			return oldState.set('userGroups', fromJS(action.response))
		} else {

			return oldState
		}
	})
	.create()
