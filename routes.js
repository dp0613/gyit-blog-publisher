module.exports = function(app) {

	var db = require('./db'),
		git = require('./github'),
		bodyParser = require('body-parser'),
		session = require('express-session'),
	  urlencodedParser = bodyParser.urlencoded({extended: false}),
	  jsonParser = bodyParser.json();

	// Session init
	app.use(session({
		cookieName: 'gyit_session',
		secret: 'mr bean',
		duration: 24 * 60 * 60 * 1000, //This cookie is valid in 1 day
		resave: false,
		saveUninitialized: true
	}));

	app.get('/', function(req, res){
	  res.writeHeader(302, {'Location': '/login'});
	  res.end();
	});

	app.get('/login', function(req, res){
	  res.render('login');
	});

	app.get('/logout', function(req, res){
		if(req.session.user) {
			req.session.destroy(function(){
				res.redirect('/login');
			});
		}
	});

	app.post('/login', urlencodedParser, function(req, res){
	  if(!req.body.username || !req.body.password) {
	    return res.render('login', {error: 'Please input all fields to login...'});
	  }

	  //Access database
	  var query = {
	    text: 'SELECT * FROM users WHERE username = $1',
	    values: [req.body.username]
	  };

	  db.query(query, function(error, result) {
	    if(error) {
	      console.log(error.stack);
	    }
	    else {
	      //Check if user is exists
	      if(result.rows.length === 0) {
	        return res.render('login', {error: 'Username or Password is incorrect!'});
	      }
	      else {
	        if(result.rows[0].password == req.body.password) {
	          //Save the session
						if(!req.session) {
							req.session.regenerate();
						}

						//Store user json
						req.session.user = JSON.stringify(result.rows[0]);

						//Redirect to publisher
						res.redirect('/publisher');
	        }
	        else {
	          return res.render('login', {error: 'Username or Password is incorrect!'});
	        }
	      }
	    }
	  });
	});

	app.get('/publisher', function(req, res){
		/*if(req.session.user) {
			var user = JSON.parse(req.session.user);
		}
		else {
			res.redirect('/login');
		}*/

		res.render('publisher', {username: 'dp0613'}); //The data param is used to fix /new route
	});

	app.post('/new', urlencodedParser, function(req, res){
		var data = {
			'title': req.body.post_title,
			'category': req.body.post_category,
			'contents': req.body.post_contents
		};

		//Validate form data

		var selected = {
			'selected1': data.category == '' ? true : false,
			'selected2': data.category == '1' ? true : false,
			'selected3': data.category == '2' ? true : false,
			'selected4': data.category == '3' ? true : false,
		};

		if(!data.title) {
			return res.render('publisher-process', {username: 'dp613', selected: selected, data: data, title_error: 'Please enter your new post title...'});
		}

		if(!data.category) {
			console.log(data);
			return res.render('publisher-process', {username: 'dp613', selected: selected, data: data, category_error: 'Please choose your post category...'});
		}

		if(data.contents == '<!DOCTYPE html>\r\n<html>\r\n<head>\r\n</head>\r\n<body>\r\n\r\n</body>\r\n</html>') {
			return res.render('publisher-process', {username: 'dp613', selected: selected, data: data, contents_error: 'Put something into your post contents...'});
		}

		//Connect github api

	});

	app.get('/git', function(req, res) {
		git();
		res.end();
	});
};
