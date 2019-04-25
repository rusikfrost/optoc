var express = require('express');
var app = express();
const	bodyParser = require('body-parser');
const	MongoClient = require('mongodb').MongoClient;
const	urlm = "mongodb://localhost:27017/";
 

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/cat', function (req, res, next) {

console.log(req.body.category)

//const add = 
			/*[ 
				{id: 0, name: 'Рыба', img: 'https://png.pngtree.com/element_origin_min_pic/16/06/13/17575e76594133f.jpg', price: '500', description: 'description description'},
				{id: 1, name: 'Хуиба', img: 'https://png.pngtree.com/element_origin_min_pic/16/06/13/17575e76594133f.jpg', price: '750', description: 'description description description'},
				{id: 2, name: 'Дзыба', img: 'https://png.pngtree.com/element_origin_min_pic/16/06/13/17575e76594133f.jpg', price: '950', description: 'description'},
				{id: 3, name: 'Лыба', img: 'https://png.pngtree.com/element_origin_min_pic/16/06/13/17575e76594133f.jpg', price: '950', description: 'description'},
				{id: 4, name: 'АЩАХАЗ', img: 'https://png.pngtree.com/element_origin_min_pic/16/06/13/17575e76594133f.jpg', price: '950', description: 'description'},
			]; */
	MongoClient.connect(urlm, function(err, db) {
		var dbo = db.db("test");
	 	dbo.collection(req.body.category).find({}).toArray(function(err, result)  {
	 		//res.send(result)
	 		console.log(result)
	   		db.close();
	   		res.send(result); 
	    });
	})


});

app.get('/admin', function (req, res) {
	res.sendFile(__dirname + '/admin.html');
});

app.use('/add', function (req, res) {
console.log(req.body.category)

MongoClient.connect(urlm, function(err, db) {
		var dbo = db.db("test");
	 	dbo.collection(req.body.category).insert( req.body.add_obj, function(err, res) {
    		if (err) throw err;
    			console.log("1 document updated");
    		db.close();
  		});
	});

});

app.use('/delete', function (req, res) {
	console.log(req.body.delete_obj)
	MongoClient.connect(urlm, function(err, db) {
		var dbo = db.db("test");
	 	dbo.collection(req.body.category).remove( req.body.delete_obj, function(err, res) {
    		if (err) throw err;
    			console.log("1 document deleted");
    		db.close();
  		});
	});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});