const btn = document.querySelector('.btn-test');
const status = document.querySelector('#status');
const qcURL = document.querySelector('.URL');

const error = () => {
	status.textContent = 'Местоположение не найдено';
}

const getTimezone = async (latitude, longitude) => {
	const response = await fetch(`https://api.ipgeolocation.io/timezone?apiKey=ca4dee1db1394658a0a988f886b6beb4&lat=${latitude}&long=${longitude}`);
	const timezoneJSON = await response.json();
	qcURL.innerHTML = `timezone= ${timezoneJSON.timezone}; date_time_txt=${timezoneJSON.date_time_txt}`;
}

const success = (position) => {
	console.log('position', position);
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	status.textContent = `latitude=${latitude} longitude=${longitude}`;
	const requestResult = getTimezone(latitude, longitude);

}

btn.addEventListener('click', () => {
	if (!navigator.geolocation) {
		status.textContent = 'Определение геолокации не поддерживается браузером';
	} else {
		navigator.geolocation.getCurrentPosition(success, error);
	}
});