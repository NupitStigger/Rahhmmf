const apiKey = 'd720c9d44ee07cf5696d77650ccfbca3';
const kzCities = ['Almaty', 'Astana', 'Shymkent', 'Aktau', 'Atyrau', 'Aktobe', 'Karaganda', 'Taraz', 'Pavlodar', 'Semey'];

document.addEventListener('DOMContentLoaded', () => {
    // Бірінші рет ашқанда рандомды қала
    const randomCity = kzCities[Math.floor(Math.random() * kzCities.length)];
    getWeather(randomCity);
});

// Іздеу батырмасын басқанда
document.getElementById('searchBtn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value.trim();
    if (city) getWeather(city);
});

// "Enter" басқанда да іздейтін қылу
document.getElementById('cityInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = e.target.value.trim();
        if (city) getWeather(city);
    }
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=kk`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Қала табылмады');
        
        const data = await response.json();
        
        document.getElementById('errorMessage').innerText = "";
        document.getElementById('cityName').innerText = data.name.toUpperCase();
        document.getElementById('temperature').innerText = `${Math.round(data.main.temp)}°C`;
        document.getElementById('humidity').innerText = data.main.humidity;
    } catch (error) {
        document.getElementById('errorMessage').innerText = "Қала табылмады!";
    }
}
