function Post(url, bodyData, headerData)
{
	SendRequest("POST", url, bodyData, headerData, null);
}

function Get(url, bodyData, headerData, onResponse=null)
{
	SendRequest("GET", url, bodyData, headerData, onResponse);
}

function Put(url, bodyData, headerData)
{
	SendRequest("PUT", url, bodyData, headerData, null);
}

function SendRequest(method, url, bodyData, headerData, onResponse)
{
	var xhr = new XMLHttpRequest();
	xhr.open(method, url);

	headerData.forEach(element => {
		xhr.setRequestHeader(element[0], element[1]);
	});

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			LogResponse(xhr);
			if (onResponse) {
			onResponse(xhr.responseText)
			}
		}
	};

	xhr.send(bodyData);
	LogSendRequest(xhr, headerData, bodyData);
}

function GenerateRandomString(length) {
	var text = '';
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

function LogSendRequest(xhr, headerData, bodyData)
{
	console.log(headerData);
	console.log(bodyData);
}

function LogResponse(xhr)
{
	console.log(xhr.status);
	console.log(xhr.responseText);
}
