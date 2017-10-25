var channels = [
  "ESL_SC2",
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas"
];

// Read api and get info/make URL for channels
function getChannelInfo() {
  channels.forEach(function(channel) {
    function makeURL(type, name) {
      return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?';
    };
    $.getJSON(makeURL("streams", channel), function(data) {
      var game,
          status;
      if (data.stream === null) {
        game = "Offline";
        status = "offline";
      } else if (data.stream === undefined) {
        game = "Account Closed";
        status = "offline";
      } else {
        game = data.stream.game;
        status = "online";
      };

      // Populate HTML
      $.getJSON(makeURL("channels", channel), function(data) {
        var logo = data.logo != null ? data.logo : "https://pbs.twimg.com/profile_images/747456419683774464/wnl4EjM-_400x400.jpg",
          name = data.display_name != null ? data.display_name : channel,
          description = status === "online" ? ': ' + data.status : "";
          html = '<div class="row ' +
          status + '"><div class="col-xs-2 col-sm-1" id="icon"><img src="' +
          logo + '" class="logo"></div><div class="col-xs-10 col-sm-3" id="name"><a href="' +
          data.url + '" target="_blank">' +
          name + '</a></div><div class="col-xs-10 col-sm-8" id="streaming">'+
          game + '<span class="hidden-xs">' +
          description + '</span></div></div>';
        status === "online" ? $("#streams").prepend(html) : $("#streams").append(html);
      });
    });
  });
};

$(document).ready(function() {
  getChannelInfo();
});
