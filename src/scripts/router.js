import Router from './utils/Router'

import Home from './views/Home'

var router = new Router({
	'/': function (params) {
		return {
			view: Home,
			props: {}
		}
	},
	'/app': function (params) {
		return {
			view: Home,
			props: {}
		}
	},
	'/app/profile': function (params) {

	},
	'/app/group': function (params) {

	},
	'/app/lobby': function (params) {

	}
})

router.mount('#app')

export default router