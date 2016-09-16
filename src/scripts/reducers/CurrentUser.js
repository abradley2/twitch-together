import {List, Map} from 'immutable'
import {generate as genId} from 'shortid'
import {
	LOGIN,
	LOGOUT
} from '../actions/CurrentUserActions'

const initialState = Map({
	loginRequest: {
		hasFetched: false
	}
})

export default function (state = Map({}), action) {

	switch (action.type) {

		case LOGIN:
			return state.set('loginRequest', {
				request: action.request,
				status: action.status,
				response: action.response,
				hasFetched: true
			})

		case LOGOUT:
			return state

		default:
			return state

	}

}
