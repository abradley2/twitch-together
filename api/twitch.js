var _ = require('underscore')
var http = require('http')
var Router = require('koa-router')
var Promise = require('bluebird')
var fn = require('./utils/fn')
var config = require('../local.json')

var twitch = new Router()

var baseUrl = 'https://api.twitch.tv/kraken'

var baseHeaders = {
	'Accept': 'application/vnd.twitchtv.v3+json',
	'Client-ID': config.twitchClientId
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
		url: encodeURI(
			'https://api.twitch.tv/kraken/oauth2/authorize' +
			'?response_type=code' +
			'&client_id=' + config.twitchClientId +
			'&scope=' + [
				'user_read',
				'user_blocks_read',
				'user_subscriptions',
				'channel_subscriptions',
				'channel_check_subscription'
			].join(' ') +
			'&state=' + ctx.session.currentUser.sid +
			'&redirect_uri=' + config.twitchAuthRedirectUri
		)
	})
})

twitch.post('/login', function* () {
	var ctx = this

	yield request = fn.requestAsPromise({
		headers: baseHeaders,
		method: 'POST',
		url: (
			'https://api.twitch.tv/kraken/oauth2/token' +
			'?client_id=' + config.twitchClientId +
			'&client_secret=' + config.twitchClientSecret +
			'&grant_type=authorization_code' +
			'&redirect_uri=' + config.twitchAuthRedirectUri +
			'&code=' + ctx.request.body.code +
			'&state=' + ctx.session.currentUser.sid
		)
	}).then(res => {
		_.extend(
			ctx.session,
			_.pick(JSON.parse(res), 'access_token', 'refresh_token', 'scope')
		)

		ctx.session.currentUser.loggedIn = true
	})

	this.response.type = 'application/json'
	this.response.body = JSON.stringify(ctx.session.currentUser)
})

twitch.get('/games/top', function* () {
	yield fn.requestAsPromise({
		headers: baseHeaders,
		url: baseUrl + '/games/top'
	}).then(function (data) {
		console.log('data = ', data)
	})

})

twitch.get('/channel', function* () {
	var ctx = this

	var opts = {
		headers: _.extend({
			Authorization: ctx.session.access_token
		}, baseHeaders),
		url: baseUrl + '/channel'
	}

	console.log(opts)

	yield fn.requestAsPromise(opts).then(res => {
		console.log('res = ',res)
	})

	ctx.response.type = 'application/json'
	ctx.response.body = JSON.stringiy(res)
})

module.exports = twitch
