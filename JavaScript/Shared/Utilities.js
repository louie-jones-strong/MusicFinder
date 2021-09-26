function GetTimeString(ms)
{
	var seconds = Math.round(ms / 1000);
	var mins = Math.floor(seconds / 60);
	var remainingSeconds = seconds % 60;

	return mins + ":" + remainingSeconds;
}

function GetUrlParameters()
{
	var parameterDict = {};

	var parameterStrings = window.location.href.split('?');

	if (parameterStrings.length < 2)
	{
		parameterStrings = window.location.href.split('#');
	}


	if (parameterStrings.length >= 2)
	{
		var parameterStringsList = parameterStrings[1].split('&');

		for (let index = 0; index < parameterStringsList.length; index++)
		{
			const parameterString = parameterStringsList[index];
			var kvp = parameterString.split("=");
			var key = kvp[0];
			var value = kvp[1];
			parameterDict[key] = value;
		}
	}

	console.log(parameterDict);
	return parameterDict;
}