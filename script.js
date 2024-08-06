async function getWeather() {
    const apiKey = 'ac3c30798d0c74880f1288453c4f1bc0'; // Replace with your OpenWeatherMap API key
    const city = document.getElementById('city').value.trim();
    const cityNameElement = document.getElementById('city-name');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
    const errorMsgElement = document.getElementById('error-msg');

    if (city.length === 0) {
        clearWeatherInfo();
        errorMsgElement.textContent = 'Please enter a city name.';
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Weather data not available');
        }

        const data = await response.json();
        cityNameElement.textContent = `City: ${data.name}`;
        temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
        descriptionElement.textContent = `Weather: ${data.weather[0].description}`;
        errorMsgElement.textContent = '';
    } catch (error) {
        clearWeatherInfo();
        errorMsgElement.textContent = `Error: ${error.message}`;
    }
}

function clearWeatherInfo() {
    document.getElementById('city-name').textContent = '';
    document.getElementById('temperature').textContent = '';
    document.getElementById('description').textContent = '';
}
