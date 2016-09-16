exports.requestAsPromise = function (opts) {
	return new Promise(function (resolve, reject) {
		http.request(opts, function () {

			res.setEncoding('utf8')

			if (res.statusCode >= 200 && res.statusCode < 400) {
				res.on('data', (chunk) => {
					resolve(chunk)
				})
			} else {
				reject(res)
			}

			res.on('error', (e) => {
				reject({error: e.message})
			})

		})
	})
}
