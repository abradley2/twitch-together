var _ = require('underscore')
var http = require('http')
var Router = require('koa-router')
var Promise = require('bluebird')
var fn = require('./utils/fn')
var config = require('../local.json')
var UserModel = require('./models/UserModel')
var stringify = JSON.stringify
var parse = JSON.parse

var twitchAuth = new Router()

var baseUrl = 'https://api.twitch.tv/kraken'

var baseHeaders = function () {
	return {
		'Accept': 'application/vnd.twitchtv.v3+json',
		'Client-ID': config.twitchClientId
	}
}

var oAuthHeaders = function (access_token) {
	return _.extend({
		'Authorization': 'OAuth ' + access_token
	}, baseHeaders())
}

twitchAuth.post('/authorize', function* () {
	var ctx = this
	var authRes
	var twitchUserRes
	var userRes

	// get the oauth token
	yield fn.requestAsPromise({
		headers: baseHeaders(ctx),
		method: 'POST',
		url: (
			'https://api.twitch.tv/kraken/oauth2/token' +
			'?client_id=' + config.twitchClientId +
			'&client_secret=' + config.twitchClientSecret +
			'&grant_type=authorization_code' +
			'&redirect_uri=' + config.twitchAuthRedirectUri +
			'&code=' + ctx.request.body.code +
			'&state=' + ctx.session.sid
		)
	}).then(function (res) {
		authRes = parse(res)
	})

	// use oauth token to get user info
	yield fn.requestAsPromise({
		url: baseUrl + '/user',
		headers: oAuthHeaders( authRes.access_token )
	}).then(function (res) {
		twitchUserRes = parse(res)
	})

	// create or update the user with twitch info (upsert)
	yield UserModel.findOneAndUpdate(
		{twitchId: twitchUserRes._id},
		{
			twitchId: twitchUserRes._id,
			twitchName: twitchUserRes.display_name,
			email: twitchUserRes.email,
			logo: twitchUserRes.logo,
			bio: twitchUserRes.bio
		},
		{setDefaultsOnInsert: true, new: true, upsert: true}
	)
		.exec()
		.then(function (user) {
			_.extend(ctx.session, {twitchId: user.twitchId})
		})

	// return session, which now has the twitchId included
	this.response.type = 'application/json'
	this.response.body = stringify(ctx.session)
})

twitchAuth.post('/logout', function* () {
	var ctx = this

	_.extend(ctx.session, {twitchId: null})

	this.response.type = 'application/json'
	this.response.body = JSON.stringify(ctx.session)
})

module.exports = twitchAuth
