import {compose, combineReducers, createStore, applyMiddleware} from 'redux'
import {Map} from 'immutable'
import {getQueryStringParam} from './utils/fn'
import {logger, handleAsync, handleBatch} from './utils/middlewares'

import CurrentUser from './reducers/CurrentUser'
import TwitchAuth from './reducers/TwitchAuth'
import Navigation from './reducers/Navigation'

const app = combineReducers({
	TwitchAuth: TwitchAuth,
	CurrentUser: CurrentUser,
	Navigation: Navigation
})

const store = createStore(
	app,
	{
		TwitchAuth: Map({
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
