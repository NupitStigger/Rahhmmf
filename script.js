const apiKey = 'd720c9d44ee07cf5696d77650ccfbca3';
// Автоматты түрде таңдалатын қалалар тізімі
const kzCities = ['Almaty', 'Astana', 'Shymkent', 'Aktau', 'Atyrau', 'Aktobe', 'Karaganda', 'Taraz', 'Pavlodar', 'Semey', 'Uralsk', 'Kyzylorda'];

document.addEventListener('DOMContentLoaded', () => {
    // Сайт ашылғанда рандомды қаланы алу
    const randomCity = kzCities[Math.floor(Math.random() * kzCities.length)];
    getWeather(randomCity);
});

document.getElementById('searchBtn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value.trim();
    if (city) getWeather(city);
});

async function getWeather(city) {
    // Түзетілген URL: сұрақ белгісі қосылды және lang=kk орнатылды
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=kk`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Қала табылмады');
        
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('errorMessage').innerText = error.message;
        document.getElementById('weatherResult').style.display = 'none';
    }
}

function displayWeather(data) {
    document.getElementById('errorMessage').innerText = '';
    const resultDiv = document.getElementById('weatherResult');
    resultDiv.style.display = 'block';
    
    document.getElementById('cityName').innerText = data.name;
    document.getElementById('temperature').innerText = `${Math.round(data.main.temp)}°C`;
    document.getElementById('description').innerText = data.weather[0].description;
    document.getElementById('humidity').innerText = data.main.humidity;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}
