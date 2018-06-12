var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Routine = new Schema({
    userId: {type:String, required:true},
    name: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: Date
});

module.exports = mongoose.model('Routine', Routine);