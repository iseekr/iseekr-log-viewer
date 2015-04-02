var express = require("express.oi");
var app = express();
var fs = require('fs');
app.http().io();
app.io.set('transports', ['websocket']);

var log = app.io.of('log');

app.get('/', function(req, res, next) {
	res.send(fs.readFileSync('./connect.html').toString());
});

app.get('/x.gif', function(req, res, next) {
	log.emit('log:new', req.query);
	res.status(204).send();
});

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));


module.exports = function(option) {
	app.listen(8089);
};