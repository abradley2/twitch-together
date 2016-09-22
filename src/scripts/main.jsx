import * as React from 'react'
import Navigo from 'navigo'
import {render} from 'react-dom'
import {bindActionCreators} from 'redux'
import store from './store'
import router from './router'

import Auth from './views/Auth'
import Home from './views/Home'

import {
	creators,
	GET_SESSION,
	AUTHORIZE
} from './actions/CurrentUserActions'

var appContainer
var actions = bindActionCreators(creators, store.dispatch)

router.on({
	'/': function () {
		render(
			<Home />,
			appContainer
		)
	},
	'/app/home': function () {
		render(
			<Home />,
			appContainer
		)
	},
	'/app/auth': function () {
		render(
			<Auth />,
			appContainer
		)
	}
})

document.addEventListener('DOMContentLoaded', function () {
	var ready
	appContainer = document.getElementById('app')
	ready = store.subscribe(function () {
		let state = store.getState()
		if (
			state.CurrentUser
			&& state.CurrentUser.get('session')
		) {
			let session = state.CurrentUser.get('session')
			if (!session.loggedIn) {
				router.navigate('/app/auth')
			}
			router.resolve()
			ready()
		}
	})
	actions[GET_SESSION]()
})

document.addEventListener('click', function (e) {
	var el = findParent('A', e.target)
	if (el && el.hasAttribute('data-link')) {
		e.stopPropagation()
		e.preventDefault()
	}
})

function findParent (tagname, el) {
	if (el.tagName === tagname) {
		return el
	}
	while (el = el.parentNode) {
		if (el.tagName === tagname) {
			return el
		}
	}
	return null
}
