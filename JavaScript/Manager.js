
var hostname = "https://louie-jones-strong.github.io/MusicFinder/"
if (location.hostname === "localhost" || location.hostname === "127.0.0.1")
{
	var hostname = "http://localhost:5500/";
}

var loginUri = hostname + "login.html";

var parameterDict = GetUrlParameters();

if (!("access_token" in parameterDict))
{
	window.location.replace(loginUri);
}

window.onSpotifyWebPlaybackSDKReady = () => {

	var token = parameterDict["access_token"];

	const player = new Spotify.Player({
		name: 'Music Mixer',
		getOAuthToken: cb => { cb(token); },
		volume: 0.5
	});

	// Ready
	player.addListener('ready', ({ device_id }) => {
		console.log('Ready with Device ID', device_id);

		var bodyData = '{"device_ids": ["'+device_id+'"]}';

		var headerData = [
			["Content-Type", "application/json"],
			["Authorization", "Bearer "+token]
		];
		Put("https://api.spotify.com/v1/me/player", bodyData, headerData);
	});

	player.addListener('not_ready', ({ device_id }) => {
		console.log('Device ID has gone offline', device_id);
	});

	player.addListener('initialization_error', ({ message }) => {
		console.error(message);
	});

	player.addListener('authentication_error', ({ message }) => {
		console.error(message);
	});

	player.addListener('account_error', ({ message }) => {
		console.error(message);
	});

	// track changed
	let currentTrack = '';

	player.on('player_state_changed', state => {

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

		}
	});

	player.connect();
}