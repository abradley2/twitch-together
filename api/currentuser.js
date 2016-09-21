var Router = require('koa-router')

var currentuser = new Router()

currentuser.get('/session', function () {
	var ctx = this

	this.response.type = 'application/json'
	this.response.body = JSON.stringify(ctx.session.currentUser)
})

module.exports = currentuser