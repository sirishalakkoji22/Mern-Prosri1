const API_KEY = "YOUR_API_KEY";

// Weather icon mapping
function getIcon(iconCode) {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// Search weather by city
async function getWeather() {

    const city = document.getElementById("city").value;

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        displayWeather(data);

    } catch (error) {
        document.getElementById("weather").innerHTML =
            "<h2>Error fetching weather data.</h2>";
    }
}

// Get weather using current location
function getLocationWeather() {

    navigator.geolocation.getCurrentPosition(async (position) => {

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const url =
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

        try {

            const response = await fetch(url);
            const data = await response.json();

            displayWeather(data);

        } catch (error) {

            document.getElementById("weather").innerHTML =
                "<h2>Unable to fetch weather.</h2>";

        }

    }, () => {

        alert("Location access denied.");

    });
}

// Display weather information
function displayWeather(data) {

    if (data.cod != 200) {

        document.getElementById("weather").innerHTML =
            "<h2>City not found</h2>";

        return;
    }

    document.getElementById("weather").innerHTML = `
    
        <img src="${getIcon(data.weather[0].icon)}">

        <h2>${data.name}, ${data.sys.country}</h2>

        <h3>${data.main.temp}°C</h3>

        <p><strong>${data.weather[0].main}</strong></p>

        <p>Feels Like: ${data.main.feels_like}°C</p>

        <p>Humidity: ${data.main.humidity}%</p>

        <p>Wind Speed: ${data.wind.speed} m/s</p>

    `;
}