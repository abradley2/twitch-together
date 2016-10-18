import * as React from 'react'
import {bindActionCreators} from 'redux'
import {getQueryStringParam} from './utils/fn'
import store from './store'
import router from './router'

import {
	creators,
	GET_AUTHORIZATION_URL,
	AUTHORIZE,
	GET_CURRENT_USER
} from './actions/CurrentUserActions'

document.addEventListener('DOMContentLoaded', function () {
	var actions = bindActionCreators(creators, store.dispatch)
	var CurrentUser = store.getState().CurrentUser.toJS()

	console.log('CurrentUser = ',CurrentUser)

	router.mount( document.getElementById('app') )

	actions[GET_CURRENT_USER]()
	// if the user has been directed to this application 
	// via twitch authentication, trigger the authorize action
	if (CurrentUser.authorizationCode) {
		router.navigate(window.location.pathname, {replace: true})
		actions[AUTHORIZE](CurrentUser.authorizationCode)
		//window.location.search = ''
	} else {
		router.resolve()
	}

})

// intercept link click events to support pushState routing
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
