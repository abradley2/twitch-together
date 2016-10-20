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
	bio: {
		type: String
	},
	logo: {
		type: String
	},
	location: {
		index: '2dsphere',
		type: [Number],
		default: [0,0]
	},
	email: {
		type: String,
		required: true
	},
	groups: {
		type: [ObjectId],
		default: []
	}
})

var UserModel = mongoose.model('player', UserSchema)

module.exports = UserModel
