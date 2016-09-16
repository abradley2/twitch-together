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

app.keys = config.keys || ['What is funnier than 24']
app.use(session(app))
app.use(function* (next) {
	_.defaults(this.session, {
		currentUser: {
			sid: shortid.generate(),
			loggedIn: false
		}
	})
	yield next
})

app.use(bodyParser())
app.use( serve(__dirname + '/public') )

var site = new Router()

var indexHtml, getIndex = getFile('public/index.html')

site.get('/app/:path*', function* () {
	yield getIndex.then(function (res) {indexHtml = res})
	this.response.type = 'text/html'
	this.response.body = yield getFile('public/index.html')
})

app.use( site.routes() )

var api = new Router()

api.use('/api/twitch', require('./api/twitch').routes())

app.use(api.routes())

app.listen(config.port)

/*
    Simple convenience method for getting a file and returning
    the thunk as a co/koa compatible promise
*/
function getFile (path) {
	return new Promise(function (resolve, reject) {
		fs.readFile(__dirname + '/' + path, 'utf8', function (err, data) {
			if (err) reject(err)
			else resolve(data)
		})
	})
}



