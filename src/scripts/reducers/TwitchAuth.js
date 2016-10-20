import { List, Map, fromJS } from 'immutable'
import { setupReducer } from '../utils/fn'
import {
	LOGOUT
} from '../actions/TwitchAuthActions'

const initialState = Map({
	twitchId: null
})

var TwitchAuth = setupReducer(initialState)
	.on(LOGOUT, function (oldState, action) {

		window.location.pathname = '/app/logout'

		return oldState
	})
	.create()

export default TwitchAuth