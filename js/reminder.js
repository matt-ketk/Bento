const REMIND_TIME = 3;

var calendarButton = document.getElementById('calendar');
var blinkOn = false;
var diff = -1;

function blink() {
    if (!blinkOn) {
        calendarButton.classList.add('qlink__link-3-active');
        blinkOn = true;
    } else {
        calendarButton.classList.remove('qlink__link-3-active');
        blinkOn = false;
    }
    setTimeout(blink, 1000);
}

function saveTimestamp() {
    localStorage.setItem('lastClicked', Date.now());
    console.log(localStorage.getItem('lastClicked'));
}

calendarButton.onclick = saveTimestamp;
if (!(localStorage.getItem('lastClicked') === null)) {
    var lastClicked = localStorage.getItem('lastClicked'); 
    diff = Date.now() - lastClicked;
    console.log(diff);

}
if (diff >= REMIND_TIME * 1000 * 3600) {
    blink();
}



