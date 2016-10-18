import {clone, assign, request} from './fn'
import {generate} from 'shortid'

export function logger (store, action) {
	return function (next) {
		return function (action) {
			return next(action)
		}
	}
}

function createAsyncDispatch (store, action) {
	return request(action.request)
		.then(res => {
			assign(action, {
				response: res
			})
			assign(action.request, {
				status: 'done'
			})
			return store.dispatch(action)
		})
		.catch(e => {
			console.error(e)
			return new Error('Ajax Error')
		})
}

export function handleAsync (store) {
	return function (next) {
		return function (action) {
			// if no request object defined on action, dont worry
			if (typeof action.request === 'undefined') {
				return next(action)
			}

			// if request has not been finished
			if (action.request.status !== 'done') {
				assign(action, {
					requestId: `${Date.now()}-${generate()}`
				})
				createAsyncDispatch(store, clone(action))
				assign(action.request, {status: 'pending'})
				return next(action)
			}

			return next(action)
		}
	}
}
