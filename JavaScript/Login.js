const SpotifyClientId = "ff96f0cfd76e4687aad442ab530cb560";

var RedirectUri = "https://louie-jones-strong.github.io/MusicFinder/";

if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
	const RedirectUri = "http://localhost:5500/index.html";
}


const Scopes = "playlist-read-private playlist-read-collaborative user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing user-library-read user-read-playback-position user-read-recently-played user-top-read app-remote-control streaming user-follow-read"

function Login() {
	let popup = window.open(
		`https://accounts.spotify.com/authorize
		?client_id=${SpotifyClientId}
		&response_type=token
		&redirect_uri=${RedirectUri}` +
		(Scopes ? '&scope=' + encodeURIComponent(Scopes) : '')+
		`&show_dialog=true`,
		'Login with Spotify',
		'width=500,height=700')

	window.spotifyCallback = (token) => {
		popup.close();
		SetupPlayer(token);
	}
}

window.onSpotifyWebPlaybackSDKReady = () => {
	token = window.location.hash.substr(1).split('&')[0].split("=")[1]

	if (token) {
		window.opener.spotifyCallback(token)
	}
}

function SetupPlayer(token) {

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

	// Not Ready
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


	// controls
	document.getElementById('skipPrevious').onclick = function() {
		player.previousTrack();
	};
	document.getElementById('togglePlay').onclick = function() {
		player.togglePlay();
	};
	document.getElementById('skipNext').onclick = function() {
		player.nextTrack();
	};

	// track changed
	let currentTrack = '';

	player.on('player_state_changed', state => {
		if(state != null && state.track_window.current_track.id != currentTrack ) {
			// The track changed!
			console.log("New Track old: " + currentTrack+ " New: " + state.track_window.current_track.id);

			if (currentTrack != '')
			{
				var audio = new Audio('Assets/Sounds/Ding.wav');
				audio.play();
			}

			currentTrack = state.track_window.current_track.id;
		}
	});

	player.connect();
}

