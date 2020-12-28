const REMIND_TIME = 3 * 1000 * 3600; // in ms 
const INTERVAL = 1000;
const reminderText = "\nRemember to check your calendar!";

var calendarButton = document.getElementById('calendar');
var lastClicked = Date.now();
var remindActive = false;
var blinkOn = false;

function remindTick() {
    if (!remindActive) {
        if (Date.now() - lastClicked >= REMIND_TIME) {
            setTimeout(function() {
                document.getElementById('greetings').innerText += reminderText;
            }, 50);
            remindActive = true;
        }
    }
    if (remindActive) {
        if (!blinkOn) {
            calendarButton.classList.add('qlink__link-3-active');
            blinkOn = true;
        } else {
            calendarButton.classList.remove('qlink__link-3-active');
            blinkOn = false;
        }
    }
    setTimeout(remindTick, INTERVAL);
}

calendarButton.onclick = function() {
    localStorage.setItem('lastClicked', Date.now());
    console.log(localStorage.getItem('lastClicked'));
}

if (!(localStorage.getItem('lastClicked') === null)) {
    var lastClicked = localStorage.getItem('lastClicked'); 
}

remindTick();
