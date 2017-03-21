var mongoose = require('mongoose');
var schema = mongoose.Schema;
//http://www.munchpunch.com/palaisdaan-restaurant-tayabas/menu
var menuSchema = new mongoose.Schema({
	name: String,
	price: Number,
	categories: String,
	status: String,
	dateCreated: Date,
	dateUpdated: Date
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Update the date before saving to database
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
menuSchema.pre('save', function(next){
	var now = new Date();
	this.dateUpdated = now;
	next();
}); 

var Menu = module.exports = mongoose.model('Menu', menuSchema);