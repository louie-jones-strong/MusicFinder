
// check if we need to login first
var hostname = "https://louie-jones-strong.github.io/MusicFinder/"
if (location.hostname === "localhost" || location.hostname === "127.0.0.1")
{
	var hostname = "http://localhost:5500/";
}

var loginUri = hostname + "login.html";

var parameterDict = GetUrlParameters();

if (!("access_token" in parameterDict))
{
	// go to the login screen
	window.location.replace(loginUri);
}
else if ("expires_at" in parameterDict)
{
	var expiresIn = parseInt(parameterDict["expires_at"]) - (Date.now() / 1000);
	setTimeout(TokenExpired, expiresIn * 1000);
}


function TokenExpired()
{
	window.location.replace(loginUri);
}

var SpotifyPlayer = null;
var TrackList = [];


window.onSpotifyWebPlaybackSDKReady = () => {

	TrackList.push(new Track("trackTimeline", "track0"));
	TrackList.push(new Track("trackTimeline", "track1"));
	TrackList.push(new Track("trackTimeline", "track2"));
	TrackList.push(new Track("trackTimeline", "track3"));
	TrackList.push(new Track("trackTimeline", "track4"));

	var token = parameterDict["access_token"];

	SpotifyPlayer = new Spotify.Player({
		name: 'Music Mixer',
		getOAuthToken: cb => { cb(token); },
		volume: 0.5
	});

	// Ready
	SpotifyPlayer.addListener('ready', ({ device_id }) => {
		console.log('Ready with Device ID', device_id);

		var bodyData = '{"device_ids": ["'+device_id+'"]}';

		var headerData = [
			["Content-Type", "application/json"],
			["Authorization", "Bearer "+token]
		];
		Put("https://api.spotify.com/v1/me/player", bodyData, headerData);
	});

	SpotifyPlayer.addListener('not_ready', ({ device_id }) => {
		console.log('Device ID has gone offline', device_id);
	});

	SpotifyPlayer.addListener('initialization_error', ({ message }) => {
		console.error(message);
	});

	SpotifyPlayer.addListener('authentication_error', ({ message }) => {
		console.error(message);
	});

	SpotifyPlayer.addListener('account_error', ({ message }) => {
		console.error(message);
	});

	// track changed
	let currentTrack = '';

	SpotifyPlayer.on('player_state_changed', state => {

		if (state == null)
		{
			return
		}

		if (state.position != null)
		{
			document.getElementById('playbackControls-Bar-TimeElapsed').innerHTML = GetTimeString(state.position);
		}

		if(state.track_window.current_track.id != currentTrack ) {
			// The track changed!
			console.log("New Track old: " + currentTrack+ " New: " + state.track_window.current_track.id);
			console.log(state)

			if (currentTrack != '')
			{
				var audio = new Audio('Assets/Sounds/Ding.wav');
				audio.play();
			}

			currentTrack = state.track_window.current_track.id;


			var duration_ms = state.track_window.current_track.duration_ms;
			document.getElementById('playbackControls-Bar-Duration').innerHTML = GetTimeString(duration_ms);

			TrackList[0].UpdateTrackInfo(state.track_window.previous_tracks[0]);
			TrackList[1].UpdateTrackInfo(state.track_window.previous_tracks[1]);
			TrackList[2].UpdateTrackInfo(state.track_window.current_track);
			TrackList[3].UpdateTrackInfo(state.track_window.next_tracks[0]);
			TrackList[4].UpdateTrackInfo(state.track_window.next_tracks[1]);
		}
	});

	SpotifyPlayer.connect();
}