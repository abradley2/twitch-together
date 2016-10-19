var Router = require('koa-router')
var _ = require('underscore')

var currentuser = new Router()

currentuser.get('/', function* () {
	this.response.type = 'application/json'
	this.response.body = JSON.stringify(this.session)
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
