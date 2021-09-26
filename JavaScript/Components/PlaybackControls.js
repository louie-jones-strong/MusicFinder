
class PlaybackControls
{

	constructor()
	{
		this.Paused = false;
		this.SongStartTime = Date.now();
		this.PlaybackSpeed = 1;
	}

	SetElapsedTime(elapsedTime)
	{
		this.SongStartTime = Date.now() - elapsedTime;
		UpdateElapsedTime();
	}

	SetPlaybackState(paused)
	{
		this.Paused = paused;

		var stateIcon = "pause";
		if (this.Paused)
		{
			stateIcon = "play_arrow";
		}

		document.getElementById('togglePlay').innerHTML = stateIcon;
	}
}

function UpdateElapsedTime()
{
	var elapsedTime = Date.now() - Controls.SongStartTime;
	document.getElementById('playbackControls-Bar-TimeElapsed').innerHTML = GetTimeString(elapsedTime);

	if (!Controls.Paused)
	{
		setTimeout(UpdateElapsedTime, 100);
	}
}

// controls
function PreviousTrack() {
	SpotifyPlayer.previousTrack();
}

function TogglePlay() {
	SpotifyPlayer.togglePlay();
}

function SkipNext() {
	SpotifyPlayer.nextTrack();
}