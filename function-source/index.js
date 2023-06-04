// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

// Local functions to select an activity for terminal intents.
function randomPassiveActivity() {
  const pool = [
    "Watch Love Live",
    "Take a bath",
    "Re-watch a TV show",
    "Watch Trailer Park Boys",
    "Watch The Office",
    "Lay down and listen to music for 15 minutes"
  ];
  const random = Math.floor(Math.random() * pool.length);
  return pool[random];
}

function randomHobbyActivity() {
  const pool = [
    "Play Minecraft",
    "Play Age of Mythology",
    "Play Counterstrike",
    "Play tabletop game with roommates"
  ];
  const random = Math.floor(Math.random() * pool.length);
  return pool[random];
}

function randomOutdoorActivity() {
  const pool = [
    "Bike to Southeast",
    "Bike to Northeast",
    "Bike to Northwest",
    "Walk to Safeway",
    "Bus to random part of town and explore",
    "Bike to OHSU",
    "Walk around with your camera"
  ];
  const random = Math.floor(Math.random() * pool.length);
  return pool[random];
}

function randomEnrichingActivity() {
  const pool = [
    "Read 15 pages of your current book",
    "Watch a new movie",
    "Go to a new restaurant"
  ];
  const random = Math.floor(Math.random() * pool.length);
  return pool[random];
}
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  // Main terminal intents
  function passiveActivityHandler(agent) {
    agent.add(randomPassiveActivity());
  }

  function hobbyActivityHandler(agent) {
    agent.add(randomHobbyActivity());
  }

  function outdoorActivityHandler(agent) {
    agent.add(randomOutdoorActivity());
  }

  function enrichmentActivityHandler(agent) {
    agent.add(randomEnrichingActivity());
  }

  // Decision tree intents

  // user reports zombie level as 'high'
  function zombieLevel_highHandler(agent) {
    agent.add(randomPassiveActivity());
  }

  // user does not feel obligated to do something productive
  function productivity_noHandler(agent) {
    agent.add(randomHobbyActivity());
  }

  // user has not been outside today
  function beenOutside_noHandler(agent) {
    agent.add(randomOutdoorActivity());
  }

  // user has already been outside today
  function beenOutside_yesHandler(agent) {
    if (Math.random() > 0.5) {
      agent.add(randomEnrichingActivity());
    }
    else {
      agent.add(randomHobbyActivity());
    }
  }

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('PassiveActivity', passiveActivityHandler);
  intentMap.set('HobbyActivity', hobbyActivityHandler);
  intentMap.set('OutdoorActivity', outdoorActivityHandler);
  intentMap.set('EnrichingActivity', enrichmentActivityHandler);
  intentMap.set('HelpDecide_zombie-high', zombieLevel_highHandler);
  intentMap.set('HelpDecide_productive-no', productivity_noHandler);
  intentMap.set('HelpDecide_been-outside-no', beenOutside_noHandler);
  intentMap.set('HelpDecide_been-outside-yes', beenOutside_yesHandler);
  agent.handleRequest(intentMap);
});