import * as React from 'react'
import Navigo from 'navigo'
import {render} from 'react-dom'
import {bindActionCreators} from 'redux'
import {getQueryStringParam} from './utils/fn'
import store from './store'
import router from './router'

import Auth from './views/Auth'
import Home from './views/Home'

import {
	creators,
	LOGIN,
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
	'/app': function () {
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
	},
	'/app/profile': function () {

	},
	'/app/group': function () {

	},
	'/app/lobby': function () {

	}
})

document.addEventListener('DOMContentLoaded', function () {
	var ready
	var code = getQueryStringParam('code')

	appContainer = document.getElementById('app')

	actions[GET_SESSION]()

	if (code) {
		router.navigate(window.location.pathname, {replace: true})
		actions[LOGIN](code)
	}

	router.resolve()

})

document.addEventListener('click', function (e) {
	var el = findParent('A', e.target)
	if (el && el.hasAttribute('data-link')) {
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
