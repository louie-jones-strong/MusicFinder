
class PlaybackControls
{

	constructor()
	{
		this.Paused = false;
		this.SongStartTime = Date.now();
		this.PlaybackSpeed = 1;
	}

	SetElapsedTime(elapsedTimeMs)
	{
		this.SongStartTime = Date.now() - elapsedTimeMs;
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
		else
		{
			UpdateElapsedTime();
		}

		document.getElementById('togglePlay').innerHTML = stateIcon;
	}

	SetDuration(durationMs)
	{
		document.getElementById('playbackControls-Bar-ProgressBar').max = durationMs;
		document.getElementById('playbackControls-Bar-Duration').innerHTML = GetTimeString(durationMs);
	}
}

function UpdateElapsedTime()
{
	var elapsedTimeMs = Date.now() - Controls.SongStartTime;

	document.getElementById('playbackControls-Bar-TimeElapsed').innerHTML = GetTimeString(elapsedTimeMs);
	document.getElementById('playbackControls-Bar-ProgressBar').value = elapsedTimeMs

	if (!Controls.Paused)
	{
		setTimeout(UpdateElapsedTime, 100);
	}
}

// controls
function PreviousTrack()
{
	SpotifyPlayer.previousTrack();
}

function TogglePlay()
{
	SpotifyPlayer.togglePlay();
}

function SkipNext()
{
	SpotifyPlayer.nextTrack();
}