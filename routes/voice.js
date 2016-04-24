var twilio = require('twilio');
var SurveyResponse = require('../models/SurveyResponse');
var survey = require('../survey_data');
var GoogleMapsLoader = require('googlemaps')
var geocoder = require('../geocoding/geocoder')

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
            say('Thank you for requesting a ride. We will call you back with your ride information!');
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
    });

    setTimeout(
        SurveyResponse.findById(responseId, function(err, surveyResponse) {
        console.log('logging house number')
        console.log(surveyResponse.responses[2].answer)
        var houseNumber = surveyResponse.responses[2].answer
        console.log('logging transcript')
        console.log(transcript)
        console.log('logging zip')
        console.log(surveyResponse.responses[1].answer)
        
        var concatVar = {
            "address": "4 Dorothy Avenue, 21221"
         };

        console.log('starting geocoder')
        geocoder(concatVar, function(err, latLong){
        if(err){
            console.error(err)
        }else{
            console.log('LATLONG')
            console.log(latLong.location.lat)
            console.log(latLong.location.lng)
            }
        })
    }), 50000)
    

};
