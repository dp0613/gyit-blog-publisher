var express = require('express'),
	sassMiddleware = require('node-sass-middleware'),
	routes = require('./routes'),
	app = express();

// Config view engine
app.set('view engine', 'jade');
app.set('views', './views');

// SASS middleware
app.use(sassMiddleware({
	src: './public/css',
	dest: './public/css',
	debug: false,
	outputStype: 'compressed',
	prefix: '/css'
}));

// Static files
app.use(express.static('./public'));

// Routes
routes(app);

// Handling 404 error
app.use(function(req, res, next){
	res.status(404);
	res.send('Oops! Something went wrong...');
});

// Listen port 3000
app.listen(process.env.PORT || 3000);
