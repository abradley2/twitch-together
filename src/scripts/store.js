import {compose, combineReducers, createStore, applyMiddleware} from 'redux'
import {Map} from 'immutable'
import {getQueryStringParam} from './utils/fn'
import {logger, handleAsync} from './utils/middlewares'
import CurrentUser from './reducers/CurrentUser'

const app = combineReducers({
	CurrentUser: CurrentUser
})

const store = createStore(
	app,
	{
		CurrentUser: Map({
			authorizationCode: getQueryStringParam('code')
		})
	},
	compose(
		applyMiddleware(logger),
		applyMiddleware(handleAsync),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
)

export default store
