var Promise = require('bluebird')
var request = require('request')

exports.requestAsPromise = function (opts) {
	return new Promise(function (resolve, reject) {

		request(opts, function (err, res, body) {
			
			if (err) {
				reject(err)
			} else {
				resolve(body)
			}

		})
	})
}
