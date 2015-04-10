var express = require("express.oi");
var app = express();
var fs = require('fs');
var config =require('./config/config.json');

app.http().io();
app.io.set('transports', ['websocket']);

var log = app.io.of('log');

app.get('/x.gif', function(req, res, next) {
	log.emit('log:new', req.query);
	log.emit('log:new:raw',req.originalUrl);
	res.status(204).send();
});

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));


module.exports = function(option) {
	app.get('/', function(req, res, next) {
	res.send(fs.readFileSync('./view.html').toString().replace('{{domain}}',config.site.domain).replace('{{port}}',option.port));
});
	app.listen(option.port);
	console.log('server starts at ' + option.port);
};