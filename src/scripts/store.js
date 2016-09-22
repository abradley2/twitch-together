import {compose, combineReducers, createStore, applyMiddleware} from 'redux'
import {clone, request, assign} from './utils/fn'
import {generate as genId} from 'shortid'
import CurrentUser from './reducers/CurrentUser'

const app = combineReducers({
	CurrentUser: CurrentUser
})

var pendingRequests = {}

function createAsyncDispatch (store, action) {
	return request(action.request)
		.then(res => {
			assign(action.request, {
				status: 'done',
				response: JSON.parse(res)
			})
			return store.dispatch(action)
		})
}

function handleAsync (store) {
	return function (next) {
		return function (action) {
			console.log('action = ',action)
			// if no request object defined on action, dont worry
			if (typeof action.request === 'undefined') {
				return next(action)
			}

			// if request has not been finished
			if (action.request.status !== 'done') {
				assign(action, {
					requestId: `${Date.now()}-${genId()}`
				})
				createAsyncDispatch(store, clone(action))
				assign(action.request, {status: 'pending'})
				return next(action)
			}

			return next(action)
		}
	}
}

const store = createStore(
	app,
	compose(
		applyMiddleware(handleAsync),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
)

export default store
