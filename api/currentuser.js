var Router = require('koa-router')
var _ = require('underscore')

var currentuser = new Router()

currentuser.get('/', function* () {
	var ctx = this

	this.response.type = 'application/json'
	this.response.body = JSON.stringify(ctx.session)
})

currentuser.post('/logout', function* () {
	var ctx = this

	ctx.session = {
		sid: ctx.session.sid,
		loggedIn: false
	}

	this.response.type = 'application/json'
	this.response.body = JSON.stringify(ctx.session)
})

module.exports = currentuser