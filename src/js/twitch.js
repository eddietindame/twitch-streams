// const apiURL = 'https://wind-bow.gomix.me/twitch-api/streams/',
//   apiCallback = "?callback=?";
//
// let streamers = [
//   "Reckful",
//   "ESL_SC2",
//   "OgamingSC2",
//   "nl_Kripp",
//   "freecodecamp",
//   "AmazHS",
//   "AvoidingThePuddle",
//   "TrumpSC",
//   "noobs2ninjas"
// ];
//
// let apiCall = "";
//
// let streamName = "",
//   streamStatus = "",
//   streamPreview = "";
//
// streamers.forEach(function(stream) {
//   apiCall = apiURL + stream + apiCallback;
//
//   $.getJSON(apiCall, function(data) {
//     console.log(stream, data.stream);
//
//     streamName = '<a href="https://twitch.tv/' + stream + '">' + stream + '</a>';
//
//     if (data.stream) {
//       streamStatus = data.stream.game + ", " + data.stream.viewers + " viewers";
//       streamPreview = data.stream.preview.small;
//     } else {
//       streamStatus = "offline";
//       streamPreview = "";
//     }
//
//     var streamHTML = '<div class="stream"><div class="stream__name">' + streamName + '</div><div class="stream__status">' + streamStatus + '</div><img src="' + streamPreview + '" alt="" class="stream__preview"></div>';
//
//     $(".container").append(streamHTML);
//   });
// });
