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
		defaultValue: []
	},
	hosting: {
		type: [ObjectId],
		defaultValue: []
	},
	belongsTo: {
		type: [ObjectId],
		defaultValue: []
	},
	goingTo: {
		type: [ObjectId],
		defaultValue: []
	}
})

var UserModel = mongoose.model('player', UserSchema)

module.exports = UserModel