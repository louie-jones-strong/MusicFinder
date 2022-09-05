const SpotifyClientId = "ff96f0cfd76e4687aad442ab530cb560";

var hostname = "https://louie-jones-strong.github.io/MusicFinder/"
if (location.hostname === "localhost" || location.hostname === "127.0.0.1")
{
	var hostname = "http://localhost:5500/";
}

var RedirectUri = hostname + "login.html";

var returnUri = hostname + "index.html";

const Scopes = "playlist-read-private playlist-read-collaborative user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing user-library-read user-read-playback-position user-read-recently-played user-top-read app-remote-control streaming user-follow-read"

function Login()
{
	let popup = window.open(
		`https://accounts.spotify.com/authorize
		?client_id=${SpotifyClientId}
		&response_type=token
		&redirect_uri=${RedirectUri}` +
		(Scopes ? '&scope=' + encodeURIComponent(Scopes) : '')+
		`&show_dialog=true`,
		'Login with Spotify',
		'width=500,height=700');

	window.AuthenticateCallback = (parameterDict) => {
			popup.close();

			var newUrl = returnUri + "?";
			newUrl += "access_token=" + parameterDict["access_token"];
			newUrl += "&expires_at=" + Math.floor((Date.now() / 1000) + parseInt(parameterDict["expires_in"]));
			window.location.replace(newUrl);
		}
}

var parameterDict = GetUrlParameters();

if (parameterDict["access_token"] && window.opener)
{
	window.opener.AuthenticateCallback(parameterDict);
}