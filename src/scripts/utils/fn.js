import * as Promise from 'bluebird'

export function prop(initialVal) {
	var _val = initialVal

	return function (newVal) {
		if (arguments.length !== 0) {
			_val = newVal
		}
		return _val
	}
}

export function request(opts) {
	return new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest()

		if (typeof opts === 'string') {
			opts = {
				method: 'GET',
				url: opts
			}
		}

		xhr.open(opts.method, opts.url, true)

		if (opts.headers) {
			for (let key in opts.headers) {
				if (Object.hasOwnProperty.call(opts.headers, key)) {
					xhr.setRequestHeader(key, opts.headers[key])
				}
			}
		}

		xhr.onreadystatechange = function () {
			if (
				xhr.readyState === XMLHttpRequest.DONE
				&& xhr.status >= 200
				&& xhr.status < 400
			) {
				resolve(xhr.response)
			} else {
				reject(xhr.response)
			}
		}

		xhr.onerror = function () {
			reject('xhr error')
			throw new Error('xhr error')
		}

		xhr.send(opts.data)
	})
}

export function getQueryStringParam (param) {
	let qs = decodeURIComponent(window.location.search.substr(1))
		.split('&')
		.map(pair => {
			return [ pair.split('=')[0], pair.split('=')[1] ]
		})
		.filter(pair => {
			return pair[0] === param
		})
		.shift()[1]
}

export function assign(target) {
	if (target === undefined || target === null) {
		throw new TypeError('Cannot convert undefined or null to object')
	}

	var output = Object(target)
	for (var index = 1; index < arguments.length; index++) {
		var source = arguments[index]
		if (source !== undefined && source !== null) {
			for (var nextKey in source) {
				if (source.hasOwnProperty(nextKey)) {
					output[nextKey] = source[nextKey]
				}
			}
		}
	}
	return output;
}