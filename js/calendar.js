var CLIENT_ID = credentials.client_id;
var API_KEY = credentials.api_key;
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(function () {
      // Listen for sign-in state changes.

      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

     // Handle the initial sign-in state.
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      authorizeButton.onclick = handleAuthClick;
      signoutButton.onclick = handleSignoutClick;
    }, function(error) {
      appendPre(JSON.stringify(error, null, 2));
    });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      authorizeButton.style.display = 'none';
      signoutButton.style.display = 'block';
      listUpcomingEvents();
    } else {
      authorizeButton.style.display = 'block';
      signoutButton.style.display = 'none';
    }
}

function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

function listUpcomingEvents() {
    gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 8,
      'orderBy': 'startTime'
    }).then(function(response) {
      var events = response.result.items;
      var entries = document.getElementsByClassName('qagenda__entry');
      if (events.length > 0) {
        for (i = 0; i < events.length; i++) {
          var event = events[i];
            console.log(event);
          var when = event.start.dateTime;
          if (!when) {
            when = event.start.date;
          }
          entries[i].innerHTML = event.summary + ": " + when;         
          entries[i].style.display = "center";
        }
      } else {
          entries[0].innerHTML = "No upcoming events!";
          entries[0].style.display = "center";
      }
    });
}
