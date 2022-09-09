class PlayBackDevice
{

	constructor()
	{
		this.DeviceList = [];
		this.UpdateDevices();
		this.PopupOpen = false;
	}

	UpdateDevices()
	{
		let bodyData = '';
		let headerData = [
			["Content-Type", "application/json"],
			["Authorization", "Bearer "+token]
		];
		Get("https://api.spotify.com/v1/me/player/devices", bodyData, headerData, this.SetDeviceListUi);
	}


	SetDeviceListUi(jsonText)
	{
		DeviceManager.DeviceList = JSON.parse(jsonText).devices;

		console.log(DeviceManager.DeviceList);
		let deviceListHtml = "";
		for (let i = 0; i < DeviceManager.DeviceList.length; i++)
		{
			const device = DeviceManager.DeviceList[i];

			deviceListHtml += '<div id="device' + device.id + '">';
			deviceListHtml += device.name;
			deviceListHtml += '</div>';
		}

		document.getElementById('devicePopup').innerHTML = deviceListHtml;
	}
}

function OpenDevicesPopup()
{
	if (DeviceManager.PopupOpen)
	{
		document.getElementById('devicePopup').classList.add("hide");
	}
	else
	{
		document.getElementById('devicePopup').classList.remove("hide");
	}
	DeviceManager.PopupOpen = !DeviceManager.PopupOpen;
}