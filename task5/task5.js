const chatMessages = document.getElementById("chatMessages");
const btnSendMessage = document.querySelector('.sendMessage');
const btnGetGeo = document.querySelector('.getGeo');
const textInput = document.querySelector('.chatMessages');
btnSendMessage.disabled = true;
btnGetGeo.disabled = true;

const websocketUri = "wss://echo.websocket.org/";
let websocket;

window.onload = (event) => {
	websocket = new WebSocket(websocketUri);
	websocket.onopen = function (evt) {
		console.log("CONNECTED");
	};
	websocket.onclose = function (evt) {
		console.log("DISCONNECTED");
	};
	websocket.onmessage = function (evt) {
		if (evt.data.indexOf('https://www.openstreetmap.org/#map=18') === -1) {
			appendMessage(
				evt.data, 'response'
			);
		}
	};
	websocket.onerror = function (evt) {
		appendMessage(
			'ERROR:' + evt.data, 'error'
		);
	};
}

function appendMessage(messageText, type) {
	var li = document.createElement("li");
	li.setAttribute("id", type);
	li.appendChild(document.createTextNode(messageText));
	chatMessages.appendChild(li);
}

btnSendMessage.addEventListener('click', () => {
	const message = textInput.value;
	appendMessage(message, 'request');
	textInput.value = '';
	websocket.send(message);
});

const error = () => {
	appendMessage('Не удалось определить местоположение', 'error');
}

const success = (position) => {
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	const openRequest = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
	appendMessage(openRequest, 'geodata');
	websocket.send(openRequest);
}

btnGetGeo.addEventListener('click', () => {
	if (!navigator.geolocation) {
		appendMessage('Определение геолокации не поддерживается браузером', 'error');
	} else {
		navigator.geolocation.getCurrentPosition(success, error);
	}
});