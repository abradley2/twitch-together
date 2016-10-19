var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId
var Schema = mongoose.Schema

var UserSchema = new Schema({
	twitchId: {
		type: String,
		required: true
	},
	twitchName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	groups: {
		type: [ObjectId],
		default: []
	},
	hosting: {
		type: [ObjectId],
		default: []
	},
	belongsTo: {
		type: [ObjectId],
		default: []
	},
	goingTo: {
		type: [ObjectId],
		default: []
	}
})

var UserModel = mongoose.model('player', UserSchema)

module.exports = UserModel
