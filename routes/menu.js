var mongoose 	= require('mongoose');
var express = require('express');
var router = express.Router();
var MenuItems = require('../models/menu.js')
var Menu = mongoose.model('Menu');

/* GET home page. */
router.get('/list', function(request, response, next) {
	var query = Menu.find({});

	var groupby = Menu.aggregate(
	[{
	  $group: {
	     "_id": "$categories", 
	      "item": { $push: {"name": "$name", "price": "$price"}},
	  }
	}]);

	query.exec((error, menu) => {
		if (error) {	
			return response.status(500).send({success: false, error: error, message: 'Something went wrong.'});
		} 
		if (!menu) {
			return response.status(200).send({success: false, message: 'Menu item does not exist'});
		}
		response.render('menu', {success: true, data: menu, message: 'Successfully fetched the product.', title: "Kamayan Sa Palaisdaan" });
		//response.json({success: true, menu: menu, message: 'Successfully fetched the product.'});
	});
});


/* GET home page. */
router.post('/create', function(request, response, next) {
	var menuItem = new Menu(request.body);

    menuItem.save((error, menu) => {        
        if (error) {			
			return response.status(500).send({success: false, error: error, message: 'Something went wrong.'});
		}
		if (!menu) {	
			return response.status(200).send({success: false, message: 'Something went wrong.'});
		}
        response.json({success: true, menu: menu, message: 'Product Successfully Registered.'});
    });
});


module.exports = router;
