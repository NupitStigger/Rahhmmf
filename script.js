const apiKey = 'd720c9d44ee07cf5696d77650ccfbca3';
const kzCities = ['Almaty', 'Astana', 'Shymkent', 'Aktau', 'Atyrau', 'Aktobe', 'Karaganda', 'Taraz', 'Pavlodar', 'Semey'];

document.addEventListener('DOMContentLoaded', () => {
    // Тізімнен кездейсоқ қала таңдау
    const randomCity = kzCities[Math.floor(Math.random() * kzCities.length)];
    getWeather(randomCity);
});

async function getWeather(city) {
    // API-ге сұраныс жіберу
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=kk`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Дерек алу мүмкін болмады');
        
        const data = await response.json();
        
        // Экранға шығару
        document.getElementById('cityName').innerText = data.name;
        document.getElementById('temperature').innerText = `${Math.round(data.main.temp)}°C`;
        document.getElementById('humidity').innerText = data.main.humidity;
    } catch (error) {
        document.getElementById('cityName').innerText = "Қате орын алды";
        console.error(error);
    }
}
