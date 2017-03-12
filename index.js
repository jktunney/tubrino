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
var cors = require('cors');
var uber = require('./uber/uber')
var expressSession   = require('express-session');
// var config = require('./config/index.js')

var Lyft = require('node-lyft');
lyft = new Lyft();

// initialize MongoDB connection
// have to serve the: webpack-dev-server --progress --colors
mongoose.connect(process.env.TUBER_MONGO_URL || 'mongodb://localhost:27017/test');
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
})

// Create Express web app with some useful middleware
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/dist'))
app.use(urlencoded({ extended: true }));
app.use(morgan('combined'));

app.use(cors());

app.get('', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.get('/', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

// app.use(
// 	expressSession({
// 		secret: config.SESSION_SECRET
// 	})
// );

// Twilio Webhook routes
app.post('/voice', voice.interview);
app.post('/voice/:responseId/transcribe/:questionIndex', voice.transcription);
app.post('/message', message);

var apiLyftController = require('./controllers/api/lyft');
app.post('/api/lyft/ridetypes',apiLyftController.getRideTypes);
app.post('/api/lyft/cost', apiLyftController.getCost);

app.get('/dist/:bundlefile', function (request, response){
  response.sendFile(path.resolve(__dirname, 'dist', request.params.bundlefile))
})

// Ajax route to aggregate response data for the UI
app.get('/api/rides', results);

app.get('/*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})
// Create HTTP server and mount Express app
var server = http.createServer(app);
server.listen(config.port, function() {
    console.log('Express server started on *:'+config.port);
});