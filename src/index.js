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
let currentTime = JSON.parse(localStorage.getItem('currentTime')) || 0;
let timeCount = '';

function getStorage() {
    localStorage.setItem('currentTime', JSON.stringify(currentTime));
}

function getClick(startStop) {
    switch (startStop) {
        case 'start':
            if (!timeCount) {
                startTime = Date.now() - currentTime;
                timeCount = setInterval(getTime, 10);
            }
            return;
        case 'stop':
            clearInterval(timeCount);
            timeCount = '';
            currentTime = Date.now() - startTime;
            getStorage();
            return;
        case 'reset':
            startTime = '';
            clearInterval(timeCount);
            currentTime = 0;
            milliseconds.textContent = '000';
            seconds.textContent = '00';
            minutes.textContent = '00';
            getStorage();
            return;
    }
}

function getTime() {
    currentTime = Date.now() - startTime;
    updateTime();
    getStorage();
}

function updateTime() {
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

updateTime();
