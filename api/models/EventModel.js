var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = mongoose.Schema.Types.ObjectId

var EventSchema = new Schema({
	creator: {
		type: ObjectId,
		required: true
	},
	time: {
		type: Date
	},
	location: {
		index: '2dsphere',
		type: [Number],
		default: [0,0]
	},
	name: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	attending: {
		type: [ObjectId]
	}
})

var EventModel = mongoose.model('event', EventSchema)

module.exports = EventModel