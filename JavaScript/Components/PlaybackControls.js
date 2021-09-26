

function SetPlaybackState(paused)
{
	var stateIcon = "pause";
	if (paused)
	{
		stateIcon = "play_arrow";
	}
	document.getElementById('togglePlay').innerHTML = stateIcon;
}

// controls
document.getElementById('skipPrevious').onclick = function() {
	SpotifyPlayer.previousTrack();
};

document.getElementById('togglePlay').onclick = function() {
	SpotifyPlayer.togglePlay();
};

document.getElementById('skipNext').onclick = function() {
	SpotifyPlayer.nextTrack();
};
