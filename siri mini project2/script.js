const API_KEY = "YOUR_API_KEY";

async function getWeather(cityName = null) {

    const city = cityName || document.getElementById("city").value;

    if (!city) return;

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            document.getElementById("weather").innerHTML = "City not found";
            return;
        }

        document.getElementById("weather").innerHTML = `
            <h2>${data.name}</h2>
            <h3>${data.main.temp} °C</h3>
            <p>${data.weather[0].main}</p>
            <p>Humidity: ${data.main.humidity}%</p>
        `;

        await fetch("http://localhost:5000/save-city", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ city })
        });

        loadHistory();

    } catch (error) {
        console.log(error);
    }
}

async function loadHistory() {

    const response = await fetch("http://localhost:5000/history");
    const cities = await response.json();

    let html = "";

    cities.forEach(city => {
        html += `<li onclick="getWeather('${city}')">${city}</li>`;
    });

    document.getElementById("historyList").innerHTML = html;
}

loadHistory();