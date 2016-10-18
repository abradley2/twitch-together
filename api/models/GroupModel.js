var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId
var Schema = mongoose.Schema
var EventSchema = require('./EventModel').schema

var GroupSchema = new Schema({
	creator: {
		type: ObjectId,
		index: true
	},
	name: {
		type: String,
		required: true
	},
	organizers: {
		type: [ObjectId]
	},
	events: {
		type: [EventSchema]
	}
})

var GroupModel = mongoose.model('group', GroupSchema)

module.exports = GroupModel