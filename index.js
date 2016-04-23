var http = require('http');
var path = require('path');
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var urlencoded = require('body-parser').urlencoded;
var config = require('./config');
var voice = require('./routes/voice');
var message = require('./routes/message');
var results = require('./routes/results');

mongoose.connect(config.mongoUrl);

var app = express();

//Create web app with some useful middleware (one variation made)
app.use(express.static(path.join(__dirname, 'public')));
app.use(urlencoded({ extended: true }));
app.use(morgan('combined'));

//Twillio Webhook routes
app.post('/voice', voice.interview);
app.post('/voice/:responseId/transcribe/:questionIndex', voice.transcription);
app.post('/message', message);

//Ajax route to aggregate response data for the UI
console.log('hey you' + results)
app.get('/results', results);

//Create HTTP server and mount express app
var server = http.createServer(app);
server.listen(3000, () => {
	console.log('Express server started on *:3000')
})
