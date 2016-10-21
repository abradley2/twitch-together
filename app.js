var _ = require('underscore')
var fs = require('fs')
var co = require('co')
var koa = require('koa')
var serve = require('koa-static')
var session = require('koa-session')
var bodyParser = require('koa-bodyparser')
var shortid = require('shortid')
var Router = require('koa-router')
var Promise = require('bluebird')
var app = koa()
var config = require('./local.json')
var mongoose = require('mongoose')

/**
 * Configure mongoose
 */
mongoose.Promise = Promise
mongoose.connect(config.mongoUri)

/**
 * Setup app and add middleware, default session
 * variables, app keys, etc
 */

app.keys = config.keys || ['What is funnier than 24']

app.use(session(app))

app.use(function *(next) {
	if (!this.session) this.session = {}

	if (!this.session.sid) this.session.sid = shortid.generate()

	yield next
})


app.use(bodyParser())
app.use( serve(__dirname + '/public') )

/**
 * Api routes
 */
var api = new Router()

api.use('/api/groups', require('./api/groups').routes())
api.use('/api/twitchAuth', require('./api/twitchAuth').routes())
api.use('/api/currentuser', require('./api/currentuser').routes())

app.use(api.routes())


/**
 * Setup SPA to always deliver public/index.html
 * so the app can use pushState based routing
 * instead of hashbang
 */
var site = new Router()

var appHtml
var authHtml
var getApp = getFile('public/app.html')
var getAuth = getFile('public/auth.html').then(function (res) {
	authHtml = _.template(res)
})

site.get(['/', '/app/:path*'], function* () {
	var ctx = this

	if (ctx.params.path === 'logout') {
		_.extend(ctx.session, {twitchId: null})
	}

	if (!ctx.session.twitchId) {

		yield getAuth

		var authUrl = encodeURI(
			'https://api.twitch.tv/kraken/oauth2/authorize' +
			'?response_type=code' +
			'&client_id=' + config.twitchClientId +
			'&scope=' + [
				'user_read'
			].join(' ') +
			'&state=' + ctx.session.sid +
			'&redirect_uri=' + config.twitchAuthRedirectUri
		)

		this.response.type = 'text/html'
		this.response.body = authHtml({authUrl: authUrl})
	} else {

		yield getApp.then(function (res) {
			appHtml = res
		})

		this.response.type = 'text/html'
		this.response.body = appHtml
	}

})

app.use( site.routes() )

/**
 *	Start the app on the port specified in the configuration
 */

app.listen(config.port)

/**
 * Simple convenience method for getting a file and returning
 * the thunk as a co/koa compatible promise
 */
function getFile (path) {
	return new Promise(function (resolve, reject) {
		fs.readFile(__dirname + '/' + path, 'utf8', function (err, data) {
			if (err) reject(err)
			else resolve(data)
		})
	})
}
