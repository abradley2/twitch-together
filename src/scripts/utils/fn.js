import Promise from 'bluebird'

export function prop (initialVal) {
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

		xhr.open(opts.method, opts.url, true)

		xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')

		if (opts.headers) {
			for (let key in opts.headers) {
				if (Object.hasOwnProperty.call(opts.headers, key)) {
					xhr.setRequestHeader(key, opts.headers[key])
				}
			}
		}

		xhr.onreadystatechange = function () {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				if (xhr.status >= 200 && xhr.status < 400) {
					resolve(xhr.response ? JSON.parse(xhr.response) : null)
				} else {
					reject(xhr.response)
				}
			}
		}

		if (opts.data) {
			xhr.send(JSON.stringify(opts.data))
		} else {
			xhr.send()
		}
	})
}

export function getQueryStringParam (param) {
	if (!location.search) return null

	let qs = decodeURIComponent(window.location.search.substr(1))
		.split('&')
		.map(pair => {
			return [ pair.split('=')[0], pair.split('=')[1] ]
		})
		.filter(pair => {
			return pair[0] === param
		})
		.shift()

	if (qs && qs.length > 0) {
		return qs[1]
	} else {
		return null
	} 
}

export function assign (target) {
	if (target === undefined || target === null) {
		throw new TypeError('Cannot convert undefined or null to object')
	}

	var output = Object(target)
	for (let index = 1; index < arguments.length; index++) {
		let source = arguments[index]
		if (source !== undefined && source !== null) {
			for (let nextKey in source) {
				if (source.hasOwnProperty(nextKey)) {
					output[nextKey] = source[nextKey]
				}
			}
		}
	}
	return output;
}

export function clone (obj) {
	return (obj === null || typeof obj !== 'object') ? obj
		: Array.isArray(obj) ? Array.prototype.map.call(obj, clone)
			: (typeof obj === 'object' ) ? (() => {
				var retVal = {}
				Object.keys(obj).forEach((key) => retVal[key] = clone(obj[key]))
				return retVal
			})()
				: obj
}
