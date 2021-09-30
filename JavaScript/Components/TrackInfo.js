class TrackInfo
{
	constructor()
	{
		this.LikeButton = null;
	}

	UpdateTrackInfo(track)
	{
		if (this.LikeButton == null)
		{
			this.LikeButton = new LikeButton("trackInfo", "trackInfo");
		}

		if (track == null)
		{

			document.getElementById("trackInfo").classList.add("hide");
		}
		else
		{

			document.getElementById("trackInfo").classList.remove("hide");

			var imageUrl = track.album.images[0].url;
			var trackTitle = track.name;

			var trackArtistsHtml = "";
			for (let index = 0; index < track.artists.length; index++)
			{
				const artist = track.artists[index];

				trackArtistsHtml += '<a href="' + artist.uri + '" target="_blank">' + artist.name + '</a>';

				if (index < track.artists.length-1)
				{
					trackArtistsHtml += ', ';
				}
			}

			document.getElementById('trackInfoImage').src = imageUrl;
			document.getElementById('trackInfoTitle').innerHTML = trackTitle;
			document.getElementById('trackInfoArtists').innerHTML = trackArtistsHtml;
		}
	}
}