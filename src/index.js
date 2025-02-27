const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const milliseconds = document.getElementById('milliseconds');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

startButton.addEventListener('click', () => getClick('start'));
stopButton.addEventListener('click', () => getClick('stop'));
resetButton.addEventListener('click', () => getClick('reset'));

let startTime = '';
let currentTime = '';
let timeCount = '';

function getClick(startStop) {
    switch (startStop) {
        case 'start':
            startTime = Date.now();
            return (timeCount = setInterval(updateTime, 10));
        case 'stop':
            return clearInterval(timeCount);
        case 'reset':
            startTime = '';
            clearInterval(timeCount);
            milliseconds.textContent = '000';
            seconds.textContent = '00';
            minutes.textContent = '00';
            return;
    }
}

function updateTime() {
    currentTime = Date.now() - startTime;

    const millisecondsTime = Math.floor(currentTime % 1000);
    const secondsTime = Math.floor((currentTime % 60000) / 1000);
    const minutesTime = Math.floor(currentTime / 60000);

    milliseconds.textContent =
        milliseconds.textContent < 100
            ? `0${millisecondsTime}`
            : milliseconds.textContent < 10
            ? `00${millisecondsTime}`
            : millisecondsTime;

    seconds.textContent = secondsTime < 10 ? `0${secondsTime}` : secondsTime;

    minutes.textContent = minutesTime < 10 ? `0${minutesTime}` : minutesTime;
}
