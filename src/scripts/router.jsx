import * as React from 'react'
import Router from './utils/Router'
import {render} from 'react-dom'
import Auth from './views/Auth'
import Home from './views/Home'


var router = new Router({
	'/': function (el, params) {
		render(
			<Home />,
			el
		)
	},
	'/app': function (el, params) {
		render(
			<Home />,
			el
		)
	},
	'/app/auth': function (el, params) {
		render(
			<Auth />,
			el
		)
	},
	'/app/profile': function (el, params) {

	},
	'/app/group': function (el, params) {

	},
	'/app/lobby': function (el, params) {

	}
})



export default router
