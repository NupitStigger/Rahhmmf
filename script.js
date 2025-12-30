const apiKey = 'СІЗДІҢ_API_КІЛТІҢІЗ'; // Осы жерге өз кілтіңізді қойыңыз

async function getWeather(city) {
    // lang=kk параметрі ауа райы сипаттамасын (мысалы: "ашық аспан") қазақша қайтарады
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=kk`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            if (response.status === 404) throw new Error('Қала табылмады');
            throw new Error('Желіде ақау болды');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('errorMessage').innerText = error.message;
    }
}

function displayWeather(data) {
    document.getElementById('cityName').innerText = data.name;
    document.getElementById('temperature').innerText = `${Math.round(data.main.temp)}°C`;
    document.getElementById('description').innerText = data.weather[0].description;
    document.getElementById('humidity').innerText = `Ылғалдылық: ${data.main.humidity}%`;
    
    const iconCode = data.weather[0].icon;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById('weatherResult').style.display = 'block';
}
