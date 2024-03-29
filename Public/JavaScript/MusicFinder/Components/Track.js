class Track
{
	constructor(parent, tackUiId)
	{
		this.TackUiId = tackUiId;

		var trackHtml = '';
		trackHtml += '<!-- ' + this.TackUiId + ' Track -->';
		trackHtml += '<div id="track' + this.TackUiId + '" class="trackCard neonOutline hide">';
		trackHtml += '	<img id="trackImage' + this.TackUiId + '" src="Public/Assets/Images/placeholder.jpg">';
		trackHtml += '	<div class="trackMetaData">';
		trackHtml += '		<h3 class="trackTitle" id="trackTitle' + this.TackUiId + '">Track Title</h3>';
		trackHtml += '		<div class="trackArtists" id="trackArtists' + this.TackUiId + '">';
		trackHtml += '			<a href="">Artist 1</a>,';
		trackHtml += '			<a href="">Artist 2</a>,';
		trackHtml += '			<a href="">Artist 3</a>';
		trackHtml += '		</div>';
		trackHtml += '	</div>';
		trackHtml += '</div>';

		document.getElementById(parent).innerHTML += trackHtml;

		this.LikeButton = new LikeButton('track' + this.TackUiId, this.TackUiId);
	}

	UpdateTrackInfo(track)
	{
		if (track == null)
		{

			document.getElementById("track" + this.TackUiId).classList.add("hide");
		}
		else
		{
			this.LikeButton.UpdateTrack(track.id);
			document.getElementById("track" + this.TackUiId).classList.remove("hide");

			var imageUrl = track.album.images[0].url;
			var trackTitle = track.name;

			var trackArtistsHtml = "By: ";
			for (let index = 0; index < track.artists.length; index++)
			{
				const artist = track.artists[index];

				trackArtistsHtml += '<a href="' + artist.uri + '" target="_blank">' + artist.name + '</a>';

				if (index < track.artists.length-1)
				{
					trackArtistsHtml += ', ';
				}
			}

			document.getElementById('trackImage' + this.TackUiId).src = imageUrl;
			document.getElementById('trackTitle' + this.TackUiId).innerHTML = trackTitle;
			document.getElementById('trackArtists' + this.TackUiId).innerHTML = trackArtistsHtml;
		}
	}
}