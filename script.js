const apiKey = "b2ec6d9d2e25a5db41e0da54b8f446a3"; // Your OpenWeather API key

async function getWeather() {
    const city = document.getElementById("city-input").value;
    const weatherCard = document.getElementById("weather-result");
    const errorMessage = document.getElementById("error-message");

    if (!city) {
        errorMessage.textContent = "Please enter a city name!";
        weatherCard.style.display = "none";
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === "404") {
            errorMessage.textContent = "City not found. Please try again!";
            weatherCard.style.display = "none";
            return;
        }

        document.getElementById("city-name").textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
        document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
        document.getElementById("description").textContent = data.weather[0].description;
        document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

        weatherCard.style.display = "block";
        errorMessage.textContent = "";
    } catch (error) {
        errorMessage.textContent = "Something went wrong. Try again later.";
        weatherCard.style.display = "none";
    }
}
