const iconElement = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temperature-value p');
const descElement = document.querySelector('.temperature-description p');

// App data
const weather = {};
weather.temperature = {
    unit: 'celsius',
};

// Change to 'F' for Fahrenheit
var tempUnit = 'K';

const KELVIN_CONVERT = 273.15;
// Use your own key for the Weather, Get it here: https://openweathermap.org/
// const key = 'abcdefg';

// Set Position function
setPosition();

function setPosition(position) {
    // Here you can change your position
    // You can use https://www.latlong.net/ to get it! (I use San Francisco as an example)
    // let latitude = 37.774929;
    // let longitude = -122.419418;

    getWeather(config.latitude, config.longitude);
}

// Get the Weather data
function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${config.weatherKey}`;

    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            let kelvin = Math.floor(data.main.temp);
            let usedTemp = kelvin - KELVIN_CONVERT; // usedTemp starts off as celsius.
            if (tempUnit == 'C') {
                usedTemp = usedTemp;
            } else if (tempUnit == 'K') {
                usedTemp = kelvin;
            } else if (tempUnit == 'F') {
                usedTemp = (usedTemp * 9/5) + 32;
            }
            weather.temperature.value = usedTemp;
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
        })
        .then(function () {
            displayWeather();
        });
}

// Display Weather info
function displayWeather() {
    iconElement.innerHTML = `<img src="icons/OneDark/${weather.iconId}.png"/>`;
    tempElement.innerHTML = (tempUnit == 'K') ? `${weather.temperature.value} <span class="darkfg">${tempUnit}</span>` 
        : `${weather.temperature.value}°<span class="darkfg">${tempUnit}</span>`;
    descElement.innerHTML = weather.description;
}
