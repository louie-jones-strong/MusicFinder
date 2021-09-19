function Post(url, bodyData, headerData)
{
	SendRequest("POST", url, bodyData, headerData);
}

function Get(url, bodyData, headerData)
{
	SendRequest("GET", url, bodyData, headerData);
}

function Put(url, bodyData, headerData)
{
	SendRequest("PUT", url, bodyData, headerData);
}

function SendRequest(method, url, bodyData, headerData)
{
	var xhr = new XMLHttpRequest();
	xhr.open(method, url);

	headerData.forEach(element => {
		xhr.setRequestHeader(element[0], element[1]);
	});

	xhr.onreadystatechange = function () {
		LogResponse(xhr);
	};

	xhr.send(bodyData);
	LogSendRequest(xhr);
}

function GenerateRandomString(length) {
	var text = '';
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

function LogSendRequest(xhr)
{
	// console.log(xhr);
}

function LogResponse(xhr)
{
	if (xhr.readyState === 4) {
		console.log(xhr.status);
		console.log(xhr.responseText);
	}
}
