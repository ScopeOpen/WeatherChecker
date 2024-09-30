let isCelsius = true;
let weatherData = {};
let firstLoad = true;

document.getElementById('weatherForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Stops the default action of the submit button happening

    const city = document.getElementById('cityInput').value; // Sets city to the input value
    const apiKey = ''; // Insert your OpenWeatherMap API key here
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Final fetch url

    try {
        const response = await fetch(url); // Fetch to api url 
        weatherData = await response.json(); // sets "weatherData" to response fetch

        if (weatherData.cod === 200) {
            displayWeather(); // Calls function
            firstLoad = false; // Toggles off boolean
            document.getElementById('toggleTemp').style.display = 'block';
        } else {
            alert(`Error: ${weatherData.message}`); // If the fetch doesn't return 200
        }
    } catch (error) {
        console.error('Error fetching weather data:', error); // If it can't be fetched
        alert('Unable to fetch weather data.');
    }
});

function displayWeather() {
    const temp = isCelsius ? (weatherData.main ? weatherData.main.temp : 0) : (weatherData.main ? (weatherData.main.temp * 9/5) + 32 : 32);
    const unit = isCelsius ? '°C' : '°F';

    const weatherHTML = `
        <div class="weather-box" style="background-color: ${isCelsius ? '#007bff' : '#ff4d4d'};">
            <p class="temp">🌡️ ${temp.toFixed(1)}${unit}</p>
            <div class="details">
                <p>☁️ Clouds: ${weatherData.clouds ? weatherData.clouds.all : 0}%</p>
                <p>💧 Humidity: ${weatherData.main ? weatherData.main.humidity : 0}%</p>
                <p>💨 Wind Speed: ${weatherData.wind ? weatherData.wind.speed : 0} m/s</p>
            </div>
        </div>
    `;
    document.querySelector('.weather-wrapper').innerHTML = weatherHTML; 
    document.getElementById('weatherInfo').style.display = 'block';
    document.getElementById('toggleTemp').style.backgroundColor = isCelsius ? '#007bff' : '#ff4d4d'; // Changes color based on isCelsius
}

document.getElementById('toggleTemp').addEventListener('click', function() { // Adds JS Listener to button click
    isCelsius = !isCelsius; // Flips "isCelsius" variable
    displayWeather(); // Calls function
    document.getElementById('toggleTemp').textContent = `Switch to ${isCelsius ? 'Fahrenheit' : 'Celsius'}`; // Changes text based on isCelsius
});
