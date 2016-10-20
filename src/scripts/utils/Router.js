import i40 from 'i40'
import {createElement} from 'react'
import {render} from 'react-dom'

export default class Router {

	constructor (routes) {
		this.matcher = i40()
		this.mountedAt = null
		window.onpopstate = this.resolve.bind(this)
		if (routes) this.on(routes)
	}

	mount (node) {
		this.mountedAt = node
	}

	getRouteDepth (routeStr) {
		if (routeStr === '/') {
			return 1
		} else {
			return routeStr.replace(/\/$/, '').split('/').length
		}
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
		history[opts.replace ? 'replaceState' : 'pushState'](
			null,
			document.title,
			url
		)
		this.resolve()
	}

	resolve () {
		let resolved = this.matcher.match(
			window.location.pathname
		)

		if (resolved) {
			let config = resolved.fn( resolved.params )
			render(
				createElement( config.view, config.props || {} ),
				document.querySelector(this.mountedAt)
			)
		}
	}
}
