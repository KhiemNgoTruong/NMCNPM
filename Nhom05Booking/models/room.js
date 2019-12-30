var mongoose = require('mongoose');
var roomModels = mongoose.Schema;
//mongoose.connect('mongodb://localhost/booking');

var roomModels = new roomModels({
    linkRoom: {type: String, require: true},
    imagePath: {type: String, require: true},
    roomName: {type: String, require: true},
    price: {type: Number, require: true},
    status: {type: String, require: true},
    type: {type: String, require: true}, //loại hạng
    category: {type: String, require: true}, //hình thức
    receivedDate: {type: Date, require: false},
    payDate: {type: Date, require: false},
    description: {type: String, required: false},
    evaluate: {type: Number, required: false}
});

module.exports = mongoose.model("roomController", roomModels);