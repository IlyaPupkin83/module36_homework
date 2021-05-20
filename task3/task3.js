const btn = document.querySelector('.btn-test');
const screenP = document.querySelector('#screen');
const coordsP = document.querySelector('#coords');

function getScreenSize() {
	screenP.innerText = `Ширина экрана:${window.screen.width}px Высота экрана:  ${window.screen.height}px`;
}

const error = () => {
	status.textContent = 'Информация о местоположении недоступна';
}

const success = (position) => {
	console.log('position', position);
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;

	coordsP.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
}

btn.addEventListener('click', () => {
	getScreenSize();

	if (!navigator.geolocation) {
		status.textContent = 'Определение геолокации не поддерживается браузером';
	} else {
		navigator.geolocation.getCurrentPosition(success, error);
	}
});