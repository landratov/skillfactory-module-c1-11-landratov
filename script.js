const timer = document.querySelector('.timer');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const message = document.querySelector('.message');

const plus_minutes = document.querySelector('.btn-plus-minutes');
const minus_minutes = document.querySelector('.btn-minus-minutes');
const plus_seconds = document.querySelector('.btn-plus-seconds');
const minus_seconds = document.querySelector('.btn-minus-seconds');
const start = document.querySelector('.btn-start');
const pause = document.querySelector('.btn-pause');

let countSec = 0;
let countMin = 0;
let timeinterval = null;

// Обновление текста в инпутах
const updateText = () => {	
  minutes.value = (0 + String(countMin)).slice(-2);
  seconds.value = (0 + String(countSec)).slice(-2);
}
updateText();

// Функция для ограничения на ввод только чисел от 0 до 59
const checkValue = (input) => {
	input.value = input.value.replace(/[^0-9.]+/g, '');
    if (input.value < 1) {
    	input.value = 0
    } else if (input.value > 59) {
    	input.value = 59;
    }
}

const countDown = () => {
	let total = countSec + countMin * 60;
	timeinterval = setTimeout(countDown, 1000);
	
	if (total <= 0) {
		clearInterval(timeinterval);
		timer.style.display = 'none';
		message.innerHTML = '<h2>Time is up!</h2>'
	}
	if (countSec > 0) countSec--;
	else {
		countSec = 59;
		countMin--;
	}
	updateText();
}

plus_minutes.onclick = () => {
	if (minutes.value < 59) {
		countMin = minutes.value;
		countMin++;
	}
	updateText();
}

minus_minutes.onclick = () => {
	if (minutes.value > 0) {
		countMin = minutes.value;
		countMin--;
	}
	updateText();
}

plus_seconds.onclick = () => {
	if (seconds.value < 59) {
		countSec = seconds.value;
		countSec++;
	} else {
		seconds.value = "00";
		countSec = seconds.value;
		plus_minutes.click();
	}
	updateText();
}

minus_seconds.onclick = () => {
	if (seconds.value > 0) {
		countSec = seconds.value;
		countSec--;
	} else if (parseInt(minutes.value) == 0) {
		return;
	} else {
		seconds.value = "59";
		countSec = seconds.value;
		minus_minutes.click();
	}
	updateText();
}

start.onclick = () => {
	start.disabled = true;
	start.classList.add("btn-basic");
	start.classList.remove("btn-success");
	pause.disabled = false;
	pause.classList.add("btn-danger");
	pause.classList.remove("btn-basic");
	countDown();
}

pause.onclick = () => {
	clearInterval(timeinterval);
	pause.disabled = true;
	pause.classList.add("btn-basic");
	pause.classList.remove("btn-danger");
	start.disabled = false;
	start.classList.add("btn-success");
	start.classList.remove("btn-basic");
}

minutes.oninput = () => {
	checkValue(minutes);
	countMin = minutes.value;
}

seconds.oninput = () => {
	checkValue(seconds);
	countSec = seconds.value;
}