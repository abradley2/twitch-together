import i40 from 'i40'

class Router {

	constructor () {
		this.matcher = i40()
		window.onpopstate = this.resolve.bind(this)
	}

	getRouteDepth (routeStr) {
		if (routeStr === '/') return 1
		return routeStr.replace(/\/$/, '').split('/').length
	}

	compareRouteDepth (routeA, routeB) {
		return this.getRouteDepth(routeA) < this.getRouteDepth(routeB)
	}

	on (route, cb) {
		if (typeof route === 'object') {
			Object.keys(route)
				.sort(this.compareRouteDepth.bind(this))
				.forEach(url => {
					this.on(url, route[url])
				})
		} else {
			this.matcher.addRoute(route, cb)
		}
	}

	navigate (url, opts = {}) {
		if (opts.replace) {
			history.replaceState(
				null,
				document.title,
				url
			)
		} else {
			history.pushState(
				null,
				document.title,
				url
			)
		}
		this.resolve()
	}

	resolve () {
		let resolved = this.matcher.match(
			window.location.pathname
		)

		if (resolved) {
			resolved.fn(resolved.params)
		}
	}
}

export default new Router()