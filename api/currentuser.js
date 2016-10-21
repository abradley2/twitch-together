var Router = require('koa-router')
var UserModel = require('./models/UserModel')
var fn = require('./utils/fn')
var _ = require('underscore')

var currentuser = new Router()

currentuser.get('/', function* () {
	var ctx = this
	var twitchId = ctx.session.twitchId
	var user = fn.prop()

	yield UserModel
		.findOne({twitchId: twitchId})
		.exec()
		.then(user)

	this.response.type = 'application/json'
	this.response.body = JSON.stringify( user() || {} )
})

currentuser.put('/', function* () {
	var ctx = this
	var twitchId = ctx.session.twitchId
	var user = fn.prop()

	yield UserModel
		.findOneAndUpdate({twitchId: twitchId}, ctx.request.body, {new: true})
		.exec()
		.then(user)

	this.response.type = 'application/json'
	this.response.body = JSON.stringify( user() || {} )
})

module.exports = currentuser
