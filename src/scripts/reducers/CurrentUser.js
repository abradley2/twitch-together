import {List, Map} from 'immutable'
import {generate as genId} from 'shortid'
import {
	GET_SESSION,
	AUTHORIZE,
	LOGOUT
} from '../actions/CurrentUserActions'

const initialState = Map({
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
			return state
		case LOGOUT:
			return state
		default:
			return state
	}

}
