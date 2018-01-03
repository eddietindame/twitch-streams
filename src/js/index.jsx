import React from 'react';
import ReactDOM from 'react-dom';
import request from 'request';
import StreamModule from './components/StreamModule.jsx';

let apiKey    = "6lo66n2furtllnzpchvm3hr8afn9yu",
    apiSecret = "teiyz3xq9k8ih94ri0uebdbsy443c4";

let streamers = [
  "Reckful",
  "ESL_SC2",
  "OgamingSC2",
  "nl_Kripp",
  "freecodecamp",
  "AmazHS",
  "AvoidingThePuddle",
  "TrumpSC",
  "noobs2ninjas"
];

let streams = [],
    users = [],
    games;

function getRequestOptions(requestType) {
  let options = {
    url: '',
    headers: { 'Client-ID': apiKey }
  };

  let parameter = '',
      collection = {};
  
  switch (requestType) {
    case 'user':
      parameter = 'users';
      collection = streamers;
      break;
    case 'stream':
      parameter = 'streams';
      collection = streamers;
      break;
    case 'game':
      parameter = 'games';
      break;
    default:
      parameter = '';
      break;
  }

  options.url = 'https://api.twitch.tv/helix/' + parameter + makeQueryParams(requestType, streamers);
  console.log('request:', options.url);

  return options;
}

function makeQueryParams(requestType, collection) {
  let params = '',
      parameter = '';

  switch (requestType) {
    case 'user':
      parameter = 'login=';
      break;
    case 'stream':
      parameter = 'user_login=';
      break;
    case 'game':
      parameter = 'id=';
      break;
    default:
      parameter = '';
      break;
  }

  collection.map(function(e, i) {
    // params += (i > 0 ? '&' : '?') + (requestType == 'user' ? '' : 'user_') + 'login=' + e;
    params += (i > 0 ? '&' : '?') + parameter + e;
  });

  return params;
}

function getStream(userId) {
  let stream;

  streams.map(function(e, i) {
    if (userId === e.user_id) {
      stream = e;
    }
  });

  return stream;
}

request(getRequestOptions('user'), function (error, response, body) {
  users = JSON.parse(body).data;
  // console.log('request:', userRequest.url);
  // console.log('error:', error);
  // console.log('statusCode:', response && response.statusCode);
  // console.log('body:', users);

  request(getRequestOptions('stream'), function (error, response, body) {
    streams = JSON.parse(body).data;
    // console.log('request:', streamRequest.url);
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', streams);

    request(getRequestOptions('game'), function (error, response, body) {
      games = JSON.parse(body).data;
      // console.log('request:', streamRequest.url);
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', games);
  
      ReactDOM.render(
        <div className="app">
          {
            users.map(function(e, i) {
              return (
                <StreamModule obj={e} key={i}>
                  { {
                      user: e,
                      stream: getStream(e.id)
                  } }
                </StreamModule>
              )
            })
          }
        </div>,
        document.getElementById('root')
      );
    });
  });
});

// ReactDOM.render(
//   <div className="app">
//     {
//       streamers.map(function(e, i) {
//         return (
//           <StreamModule obj={e} key={i}>
//             { e }
//           </StreamModule>
//         )
//       })
//     }
//   </div>,
//   document.getElementById('root')
// );
