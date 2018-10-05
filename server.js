var app = require('express')();
var homeController = require('./controller/homeController');
 
app.get('/', homeController.default);
app.get('/:orden', homeController.user);
 
var server = require('http').Server(app);
 
var port = process.env.port || 1337;
server.listen(port, function (req, res) {
    console.log('Listening on port %d', server.address().port);
});