import * as React from 'react'
import Navigo from 'navigo'
import {render} from 'react-dom'
import store from './store'
import router from './router'

import Auth from './views/Auth'
import Home from './views/Home'

var appContainer

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

store.dispatch({
	type: '__START__'
})

document.addEventListener('DOMContentLoaded', function () {
	appContainer = document.getElementById('app')
	router.resolve()
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
