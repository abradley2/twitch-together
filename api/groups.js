var Router = require('koa-router')
var UserModel = require('./models/UserModel')
var GroupModel = require('./models/GroupModel')
var fn = require('./utils/fn')
var _ = require('underscore')

var groups = new Router()

groups.get('/usergroups', function* () {
	var ctx = this
	var twitchId = ctx.session.twitchId
	var user = fn.prop()
	var groups = fn.prop()


	yield UserModel
		.findOne({twitchId: twitchId})
		.exec()
		.then(user)

	yield GroupModel
		.find({ _id: {$in: user().groups} })
		.exec()
		.then(groups)

	this.response.type = 'application/json'
	this.response.body = JSON.stringify(groups() || [])
})

module.exports = groups
