var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId
var Schema = mongoose.Schema
var EventSchema = require('./EventModel').schema

var GroupSchema = new Schema({
	creator: {
		type: ObjectId,
		index: true
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
	organizers: {
		type: [ObjectId]
	},
	events: {
		type: [EventSchema]
	}
})

var GroupModel = mongoose.model('group', GroupSchema)

module.exports = GroupModel