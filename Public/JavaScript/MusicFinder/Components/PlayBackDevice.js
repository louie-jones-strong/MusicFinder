class PlayBackDevice
{

	constructor()
	{
		this.DeviceList = [];
	}

	UpdateDevices()
	{
		let headerData = [
			["Content-Type", "application/json"],
			["Authorization", "Bearer "+token]
		];
		Get("https://api.spotify.com/v1/me/player/devices", bodyData, headerData);
	}
}

function OpenDevicesPopup()
{

}