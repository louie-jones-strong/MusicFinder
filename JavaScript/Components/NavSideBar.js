class NavSideBar
{
	constructor()
	{

		var bodyData = '';

		var headerData = [
			["Content-Type", "application/json"],
			["Authorization", "Bearer "+token]
		];
		Get("https://api.spotify.com/v1/me", bodyData, headerData, this.SetupUserInfo);

	}

	SetupUserInfo(jsonText)
	{
		var jsonObj = JSON.parse(jsonText);

		var profileImageUrl = jsonObj["images"][0]["url"];
		document.getElementById('userLogo').src = profileImageUrl;
	}
}