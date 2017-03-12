var twilio = require('twilio');
var SurveyResponse = require('../models/SurveyResponse');
var survey = require('../survey_data');
var GoogleMapsLoader = require('googlemaps')
var geocoder = require('../geocoding/geocoder')
var lyftcontroller = require('../controllers/api/lyft/ridetypes.js')
var uber = require('../uber/uber')
var LyftApi = require('lyft-api');

var defaultClient = LyftApi.ApiClient.instance;


ClientAuthentication = defaultClient.authentications['Client Authentication'];
ClientAuthentication.accessToken = "gAAAAABYMIRRu6S9oIys5Czk09ZctznhQ3RZhWsqXC8v3qrEtvVHCQ9KuGtWCZSf_eqeaIwDGHr0OKD7VrUcherdQSss7y7CdMf9PBPldusYy6e8w4KFwW8zNo0ulmibfLCFdk9mn1D15jgm9sx9eocKSHOsnwNy7cHtaOgpJlQIn_Itr6msBOQ="


UserAuthentication = defaultClient.authentications['User Authentication'];
UserAuthentication.accessToken = "gAAAAABYMIRRu6S9oIys5Czk09ZctznhQ3RZhWsqXC8v3qrEtvVHCQ9KuGtWCZSf_eqeaIwDGHr0OKD7VrUcherdQSss7y7CdMf9PBPldusYy6e8w4KFwW8zNo0ulmibfLCFdk9mn1D15jgm9sx9eocKSHOsnwNy7cHtaOgpJlQIn_Itr6msBOQ="

apiInstance = new LyftApi.PublicApi()


// Main interview loop
exports.interview = function(request, response) {
    var phone = request.body.From;
    var input = request.body.RecordingUrl || request.body.Digits;
    var twiml = new twilio.TwimlResponse();

    // helper to append a new "Say" verb with alice voice
    function say(text) {
        twiml.say(text, { voice: 'alice'});
    }

    // respond with the current TwiML content
    function respond() {
        response.type('text/xml');
        response.send(twiml.toString());
    }

    // Find an in-progess survey if one exists, otherwise create one
    SurveyResponse.advanceSurvey({
        phone: phone,
        input: input,
        survey: survey
    }, function(err, surveyResponse, questionIndex) {
        var question = survey[questionIndex];

        if (err || !surveyResponse) {
            say('Terribly sorry, but an error has occurred. Goodbye.');
            return respond();
        }

        // If question is null, we're done!
        if (!question) {
            say('Thank you for requesting a ride. We will call you back with your ride information. Goodbye.');
            return respond();
        }

        // Add a greeting if this is the first question
        if (questionIndex === 0) {
            say('Thank you for requesting a ride. Please listen carefully '
                + 'to the following questions.');
        }

        // Otherwise, ask the next question
        say(question.text);

        // Depending on the type of question, we either need to get input via
        // DTMF tones or recorded speech
        if (question.type === 'text') {
            say('Please record your response after the beep. '
                + 'Press any key to finish.');
            twiml.record({
                transcribe: true,
                transcribeCallback: '/voice/' + surveyResponse._id
                    + '/transcribe/' + questionIndex,
                maxLength: 60
            });
        } else if (question.type === 'boolean') {
            say('Press one for "yes", and any other key for "no".');
            twiml.gather({
                timeout: 20,
                numDigits: 1
            });
        } else {
            // Only other supported type is number
            say('Enter the number using the number keys on your telephone.' 
                + ' Press star to finish.');
            twiml.gather({
                timeout: 20,
                finishOnKey: '*'
            });
        }

        // render TwiML response
        respond();
    });
};

// Transcripton callback - called by Twilio with transcript of recording
// Will update survey response outside the interview call flow
exports.transcription = function(request, response) {
    var responseId = request.params.responseId;
    var questionIndex = request.params.questionIndex;
    var transcript = request.body.TranscriptionText;
    var defaultClient = LyftApi.ApiClient.instance;

    SurveyResponse.findById(responseId, function(err, surveyResponse) {
        if (err || !surveyResponse || 
            !surveyResponse.responses[questionIndex]) 
            return response.status(500).end();

        // Update appropriate answer field
        surveyResponse.responses[questionIndex].answer = transcript;
        surveyResponse.markModified('responses');
        surveyResponse.save(function(err, doc) {
            return response.status(err ? 500 : 200).end();
        });

        concatVar = {
            "address": surveyResponse.responses[2].answer + ' ' + transcript + ' ' + surveyResponse.responses[1].answer
        };

        if (!concatVar) {
            console.log('No concatVar, using default')
            concatVar = {
                "address": "4 Dorothy Avenue, 21221"
            };
        }
        console.log('Starting Geocoder')
        console.log('------------------------')
        geocoder(concatVar, function(err, latLong){
            if(err){
                console.error(err)
            }else{
                console.log('LATLONG')
                console.log(latLong.location.lat)
                console.log(latLong.location.lng)
                
                // var customerLat = latLong.location.lat
                // var customerLong = latLong.location.lng

                console.log('lyft-api')

                apiInstance.ridetypesGet(latLong.location.lat, latLong.location.lng, {'rideType': "lyft"}, function(erro, data, resp) {
                  if (erro) {
                    console.log('THere is an error')
                    console.error(erro);
                    return;
                  } else {
                    console.log('API called successfully. Returned ride type data: ' + data);
                    console.log(resp.header)
                    console.log(resp.text)
                        


                        surveyResponse.responses.push(resp.text);
                        surveyResponse.markModified('responses');
                        surveyResponse.save(function(err, doc) {
                            console.log(err, doc)
                        });
                  }
                });
                
                apiInstance.etaGet(latLong.location.lat, latLong.location.lng, {'rideType': "lyft"}, function(erro, data, resp) {
                  if (erro) {
                    console.log('THere is an error')
                    console.error(erro);
                    return;
                  } else {
                    console.log('API called successfully. Returned eta data: ' + data);
                    console.log(resp.header)
                    console.log(resp.text)
                        


                        surveyResponse.responses.push(resp.text);
                        surveyResponse.markModified('responses');
                        surveyResponse.save(function(err, doc) {
                            console.log(err, doc)
                        });
                  }
                });

                apiInstance.costGet(latLong.location.lat, latLong.location.lng, {'rideType': "lyft"}, function(erro, data, resp) {
                  if (erro) {
                    console.log('THere is an error')
                    console.error(erro);
                    return;
                  } else {
                    console.log('API called successfully. Returned cost data: ' + data);
                    console.log(resp.header)
                    console.log(resp.text)
                        


                        surveyResponse.responses.push(resp.text);
                        surveyResponse.markModified('responses');
                        surveyResponse.save(function(err, doc) {
                            console.log(err, doc)
                        });
                  }
                });


                apiInstance.driversGet(latLong.location.lat, latLong.location.lng, function(erro, data, resp) {
                  if (erro) {
                    console.log('THere is an error')
                    console.error(erro);
                    return;
                  } else {
                    console.log('API called successfully. Returned drivers data: ' + data);
                    console.log(resp.header)
                    console.log(resp.text)
                        


                        surveyResponse.responses.push(resp.text);
                        surveyResponse.markModified('responses');
                        surveyResponse.save(function(err, doc) {
                            console.log(err, doc)
                        });
                  }
                });

                uber.getEstimate({start_latitude: latLong.location.lat, start_longitude: latLong.location.lng}, function (err, res){
                    if (err) {
                        console.error(err);
                        return;
                    } else {
                        var times = res.times;
                        console.log(times);

                        // Update appropriate times field
                        surveyResponse.responses.push(times);
                        surveyResponse.markModified('responses');
                        surveyResponse.save(function(err, doc) {
                            console.log(err, doc)
                        });
                    }
                });
                
            }
        });
    });
};
//    setTimeout(
//        SurveyResponse.findById(responseId, function(err, surveyResponse) {
//        var houseNumber = surveyResponse.responses[2].answer
//        
//        var concatVar = {
//            "address": "4 Dorothy Avenue, 21221"
//         };
//
//        console.log('starting geocoder')
//        geocoder(concatVar, function(err, latLong){
//        if(err){
//            console.error(err)
//        }else{
//            console.log('LATLONG')
//            console.log(latLong.location.lat)
//            console.log(latLong.location.lng)
//            }
//        })
//    }), 50000)





//exports.orderUber = function(addrInfo) {
//    //var uberorder = new Uber.order
//    if (!addrInfo) {
//        console.log('No addrInfo, using default')
//        addrInfo = {
//            "address": "4 Dorothy Avenue, 21221"
//        };
//    }
//    console.log('starting geocoder')
//    geocoder(addrInfo, function(err, latLong){
//    if(err){
//        console.error(err)
//    }else{
//        console.log('LATLONG')
//        console.log(latLong.location.lat)
//        console.log(latLong.location.lng)
//        }
//    });
//};
