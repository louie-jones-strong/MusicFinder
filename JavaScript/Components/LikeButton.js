class LikeButton
{
	constructor(parent, uiId)
	{
		this.UiId = uiId;
		this.TrackId = null;

		var innerHTML = '<button id="likeButton' + this.UiId + '" class="likeButton")"></button>';
		document.getElementById(parent).innerHTML += innerHTML;
		this.SetLiked(false);
	}

	SetLiked(liked)
	{
		var button = document.getElementById('likeButton' + this.UiId);

		if (liked)
		{
			button.innerHTML = '<img src="Assets/Images/Heart-Liked.svg" alt="">';
		}
		else
		{
			button.innerHTML = '<img src="Assets/Images/Heart-Like.svg" alt="">';
		}

		if (this.TrackId != null)
		{
			var self = this;
			button.onclick = function() {self.SetTrackLiked(!liked);};
		}
	}

	UpdateTrack(trackId)
	{
		this.TrackId = trackId;
		this.SetLiked(false);
		var self = this;
		var bodyData = '';

		var headerData = [
			["Content-Type", "application/json"],
			["Authorization", "Bearer "+token]
		];
		Get("https://api.spotify.com/v1/me/tracks/contains?ids=" + this.TrackId, bodyData, headerData,
			function(jsonText)
			{
				var jsonObj = JSON.parse(jsonText);
				self.SetLiked(jsonObj[0]);
			});
	}

	SetTrackLiked(liked)
	{
		var bodyData = '';

		var headerData = [
			["Content-Type", "application/json"],
			["Authorization", "Bearer "+token]
		];

		var self = this;

		if (liked)
		{
			console.log("Liking Track: "+this.TrackId);

			Put("https://api.spotify.com/v1/me/tracks?ids=" + this.TrackId, bodyData, headerData, function(jsonText){self.UpdateTrack(self.TrackId);});
		}
		else
		{
			console.log("Unliking Track: "+this.TrackId);

			Delete("https://api.spotify.com/v1/me/tracks?ids=" + this.TrackId, bodyData, headerData, function(jsonText){self.UpdateTrack(self.TrackId);});
		}
	}
}