var _ = require('underscore')
var http = require('http')
var Router = require('koa-router')
var Promise = require('bluebird')
var fn = require('./utils/fn')
var config = require('../local.json')

var twitch = new Router()

var baseUrl = 'https://api.twitch.tv/kraken'

var baseOpts = {
	method: 'GET',
	headers: {
		'Accept': 'application/vnd.twitchtv.v3+json',
		'Client-ID': config.twitchClientId
	}
}

// Permissions layer
twitch.use(function* (next) {
	var ctx = this

	yield next
})

twitch.get('/authorize', function * () {
	var ctx = this

	this.response.type = 'application/json'
	this.response.body = JSON.stringify({
		url: (
			'https://api.twitch.tv/kraken/oauth2/authorize' +
			'?response_type=code' +
			'&client_id=' + config.twitchClientId +
			'&redirect_uri=' + config.twitchAuthRedirectUri +
			'&scope=' + [
				'user_read',
				'user_blocks_read',
				'user_subscriptions',
				'channel_subscriptions',
				'channel_check_subscription'
			].join('+') +
			'&state=' + ctx.session.currentUser.sid
		)
	})
})

twitch.post('/getaccesstoken/:code', function* () {
	var ctx = this

	yield request = fn.request(_.extend({
		method: 'POST',
		url: (
			'https://api.twitch.tv/kraken/oauth2/token' +
			'?client_id=' + config.twitchClientId +
			'&grant_type=authorization_code' +
			'&redirect_uri=' + config.twitchAuthRedirectUri +
			'&code=' + ctx.params.code +
			'&state=' + ctx.session.currentUser.sid
		)
	}), baseOpts)
})

twitch.get('/games/top', function* () {
	var opts = _.extend({
		url: baseUrl + '/games/top'
	}, baseOpts)

	yield fn.requestAsPromise(opts).then(function (data) {
		console.log('data = ', data)
	})

})

module.exports = twitch
