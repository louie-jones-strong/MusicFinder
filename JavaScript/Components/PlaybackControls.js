
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
