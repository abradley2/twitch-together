import {List, Map} from 'immutable'
import {generate as genId} from 'shortid'
import {
	LOGIN,
	GET_SESSION,
	AUTHORIZE,
	LOGOUT
} from '../actions/CurrentUserActions'

const initialState = Map({
	session: null,
	authorization: null,
	hasFetched: false
})

export default function (state = Map({}), action) {

	switch (action.type) {
		case GET_SESSION:
			if (action.request.status === 'done') {
				return state.merge({session: action.request.response})
			}
			return state
		case AUTHORIZE:
			if (action.request.status === 'done') {
				return state.merge({authorization: action.request.response})
			}
			return state
		case LOGIN:
			if (action.request.status === 'done') {
				console.log('login done: ',action.request.response)
				return state.merge({session: action.request.response})
			}
			return state
		case LOGOUT:
			return state
		default:
			return state
	}

}
