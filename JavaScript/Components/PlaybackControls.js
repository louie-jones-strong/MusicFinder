
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
