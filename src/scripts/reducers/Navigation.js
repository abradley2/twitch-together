import { Map } from 'immutable'
import { setupReducer } from '../utils/fn'
import { 
	NAVIGATE 
} from '../actions/NavigationActions'

import router from '../router'

const initialState = Map({
	url: window.location.pathname
})

var Navigation = setupReducer(initialState)
	.on(NAVIGATE, function (oldState, action) {
		router.navigate(action.url, action.opts || {replace: false})

		return oldState.set('url', window.location.pathname)
	})
	.create()


export default Navigation
