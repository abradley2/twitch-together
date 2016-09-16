import {compose, combineReducers, createStore, applyMiddleware} from 'redux'
import {clone, request, assign} from './utils/fn'
import CurrentUser from './reducers/CurrentUser'

const app = combineReducers({
	CurrentUser: CurrentUser
})


function createAsyncDispatch (store, action) {
	request(action.request)
		.then(res => {
			store.dispatch(assign(action, {
				status: 'done',
				response: res
			}))
		})
		.catch(e => {
			store.dispatch(assign(action, {
				status: 'done',
				error: e
			}))
		})
}

function handleAsync (store) {
	return function (next) {
		return function (action) {
			if (action.request && action.status !== 'done'
			) {
				createAsyncDispatch(store, clone(action))
			}
			assign(action, {status: 'pending'})
			next(action)
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
