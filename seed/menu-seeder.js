var MenuItems = require('../models/menu.js')
var Menu = mongoose.model('Menu');

var mongoose = require('mongoose');
// connect to mongo function
//solution to "deprecated Promise library" from https://github.com/Automattic/mongoose/issues/4291
mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/kamayansapalaisdaan');

var menus = [

	new Menu({  
	   "name":"Ginataang Sugpo",
	   "price":230,
	   "categories":"Seafoods",
	   "status":"available"
	}),
	new Menu({  
	   "name":"Steam na Sugpo",
	   "price":205,
	   "categories":"Seafoods",
	   "status":"available"
	}),
	new Menu({  
	   "name":"Ginataang Pusit",
	   "price":185,
	   "categories":"Seafoods",
	   "status":"available"
	}),
	new Menu({  
	   "name":"Inihaw na Pusit",
	   "price":175,
	   "categories":"Seafoods",
	   "status":"available"
	},
	new Menu({  
	   "name":"Kare-Kare Seafoods",
	   "price":230,
	   "categories":"Seafoods",
	   "status":"available"
	})
	

];

var done = 0;

for(var i = 0; i < menus.length; i++){
	menus[i].save(function(err, result){
		done++;
		if(done === menus.length){
			mongoose.disconnect();
		}
	});
}