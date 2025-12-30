const apiKey = 'СІЗДІҢ_API_КІЛТІҢІЗ_ОСЫНДА'; // API кілтін осы жерге қойыңыз
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');
const historyList = document.getElementById('historyList');

// Бағдарлама жүктелгенде тарихты көрсету
document.addEventListener('DOMContentLoaded', updateHistoryUI);

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=kk`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            if (response.status === 404) throw new Error('Қала табылмады');
            throw new Error('Желіде ақау болды');
        }

        const data = await response.json();
        displayWeather(data);
        saveToHistory(data.name);
    } catch (error) {
        showError(error.message);
    }
}

function displayWeather(data) {
    document.getElementById('errorMessage').innerText = '';
    weatherResult.style.display = 'block';
    
    document.getElementById('cityName').innerText = data.name;
    document.getElementById('temperature').innerText = `${Math.round(data.main.temp)}°C`;
    document.getElementById('description').innerText = data.weather[0].description;
    document.getElementById('humidity').innerText = data.main.humidity;
    
    const iconCode = data.weather[0].icon;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function showError(msg) {
    weatherResult.style.display = 'none';
    document.getElementById('errorMessage').innerText = msg;
}

function saveToHistory(city) {
    let history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
    
    // Егер қала тізімде болса, оны алып тастап, басына қосамыз (қайталанбауы үшін)
    history = history.filter(item => item.toLowerCase() !== city.toLowerCase());
    history.unshift(city);
    
    // Тек соңғы 3 қаланы сақтаймыз
    if (history.length > 3) history.pop();
    
    localStorage.setItem('weatherHistory', JSON.stringify(history));
    updateHistoryUI();
}

function updateHistoryUI() {
    const history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
    historyList.innerHTML = '';
    
    history.forEach(city => {
        const li = document.createElement('li');
        li.textContent = city;
        li.onclick = () => getWeather(city); // Тарихтағы қаланы басқанда қайта іздеу
        historyList.appendChild(li);
    });
}
