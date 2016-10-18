var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = mongoose.Schema.Types.ObjectId

var EventSchema = new Schema({
	creator: {
		type: ObjectId,
		index: true
	},
	name: {
		type: String,
		required: true
	}
})

var EventModel = mongoose.model('event', EventSchema)

module.exports = EventModel