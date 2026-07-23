// Weather API Configuration
const API_KEY = 'demo'; // Using demo mode - replace with real OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const currentLocationBtn = document.getElementById('currentLocationBtn');
const errorMessage = document.getElementById('errorMessage');
const loadingSpinner = document.getElementById('loadingSpinner');
const currentWeatherDiv = document.getElementById('currentWeather');
const forecastDiv = document.getElementById('forecastSection');
const recentSearchesDiv = document.getElementById('recentSearches');

// Recent searches storage
let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];

// Event Listeners
searchBtn.addEventListener('click', () => searchWeather());
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchWeather();
});
currentLocationBtn.addEventListener('click', getCurrentLocation);

// Initialize
window.addEventListener('load', () => {
    displayRecentSearches();
    // Demo: Load default city
    loadWeatherData('London');
});

// Search Weather Function
async function searchWeather() {
    const city = searchInput.value.trim();
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    loadWeatherData(city);
}

// Get Current Location
function getCurrentLocation() {
    if (navigator.geolocation) {
        showLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                loadWeatherDataByCoords(latitude, longitude);
            },
            (error) => {
                showLoading(false);
                showError('Unable to get your location. ' + error.message);
            }
        );
    } else {
        showError('Geolocation is not supported by your browser');
    }
}

// Load Weather Data
async function loadWeatherData(city) {
    showLoading(true);
    clearError();
    try {
        // For demo purposes, using mock data
        const weatherData = await getMockWeatherData(city);
        
        if (!weatherData) {
            showError(`Could not find weather data for "${city}"`);
            showLoading(false);
            return;
        }

        displayWeather(weatherData);
        displayForecast(weatherData.forecast);
        addRecentSearch(city);
        searchInput.value = '';
    } catch (error) {
        showError('Error fetching weather data: ' + error.message);
    } finally {
        showLoading(false);
    }
}

// Load Weather by Coordinates
async function loadWeatherDataByCoords(lat, lon) {
    showLoading(true);
    clearError();
    try {
        const weatherData = await getMockWeatherDataByCoords(lat, lon);
        displayWeather(weatherData);
        displayForecast(weatherData.forecast);
        addRecentSearch(weatherData.name);
    } catch (error) {
        showError('Error fetching weather data: ' + error.message);
    } finally {
        showLoading(false);
    }
}

// Mock Weather Data (for demo - replace with real API calls)
async function getMockWeatherData(city) {
    // Simulated weather data for different cities
    const mockData = {
        'London': {
            name: 'London',
            country: 'GB',
            temp: 15,
            feels_like: 14,
            humidity: 72,
            wind_speed: 5.2,
            pressure: 1013,
            visibility: 10000,
            description: 'Partly cloudy',
            icon: '02d',
            sunrise: '2024-01-20 07:30:00',
            sunset: '2024-01-20 17:15:00',
            uv_index: 2
        },
        'New York': {
            name: 'New York',
            country: 'US',
            temp: 5,
            feels_like: 2,
            humidity: 65,
            wind_speed: 8.5,
            pressure: 1020,
            visibility: 10000,
            description: 'Clear sky',
            icon: '01d',
            sunrise: '2024-01-20 07:15:00',
            sunset: '2024-01-20 17:35:00',
            uv_index: 1
        },
        'Tokyo': {
            name: 'Tokyo',
            country: 'JP',
            temp: 10,
            feels_like: 8,
            humidity: 55,
            wind_speed: 3.2,
            pressure: 1018,
            visibility: 10000,
            description: 'Sunny',
            icon: '01d',
            sunrise: '2024-01-20 06:50:00',
            sunset: '2024-01-20 16:45:00',
            uv_index: 3
        },
        'Sydney': {
            name: 'Sydney',
            country: 'AU',
            temp: 26,
            feels_like: 28,
            humidity: 60,
            wind_speed: 12.1,
            pressure: 1015,
            visibility: 10000,
            description: 'Rainy',
            icon: '09d',
            sunrise: '2024-01-20 05:45:00',
            sunset: '2024-01-20 20:10:00',
            uv_index: 8
        },
        'Paris': {
            name: 'Paris',
            country: 'FR',
            temp: 8,
            feels_like: 6,
            humidity: 78,
            wind_speed: 6.3,
            pressure: 1012,
            visibility: 8000,
            description: 'Cloudy',
            icon: '04d',
            sunrise: '2024-01-20 08:00:00',
            sunset: '2024-01-20 17:20:00',
            uv_index: 1
        }
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const cityData = mockData[city] || mockData[Object.keys(mockData)[Math.floor(Math.random() * Object.keys(mockData).length)]];
    
    if (!cityData) return null;

    return {
        ...cityData,
        forecast: generateMockForecast()
    };
}

async function getMockWeatherDataByCoords(lat, lon) {
    // Simulate getting weather by coordinates
    const cities = Object.keys({
        'London': true,
        'New York': true,
        'Tokyo': true,
        'Sydney': true,
        'Paris': true
    });
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    return getMockWeatherData(randomCity);
}

function generateMockForecast() {
    const forecast = [];
    const descriptions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy', 'Stormy'];
    const icons = ['01d', '02d', '04d', '09d', '11d'];
    
    for (let i = 1; i <= 5; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        forecast.push({
            date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
            temp_max: Math.floor(Math.random() * 20) + 10,
            temp_min: Math.floor(Math.random() * 15) + 5,
            description: descriptions[i % descriptions.length],
            icon: icons[i % icons.length]
        });
    }
    return forecast;
}

// Display Weather
function displayWeather(data) {
    document.getElementById('cityName').textContent = `${data.name}, ${data.country}`;
    document.getElementById('weatherDate').textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('weatherDesc').textContent = data.description;
    document.getElementById('temperature').textContent = Math.round(data.temp);
    document.getElementById('feelsLike').textContent = Math.round(data.feels_like);
    document.getElementById('humidity').textContent = `${data.humidity}%`;
    document.getElementById('windSpeed').textContent = `${data.wind_speed.toFixed(1)} m/s`;
    document.getElementById('pressure').textContent = `${data.pressure} mb`;
    document.getElementById('visibility').textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    document.getElementById('uvIndex').textContent = data.uv_index;
    document.getElementById('sunrise').textContent = data.sunrise.split(' ')[1];
    document.getElementById('weatherIcon').src = getWeatherIconURL(data.icon);
    
    currentWeatherDiv.classList.remove('hidden');
}

// Display Forecast
function displayForecast(forecast) {
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = '';
    
    forecast.forEach(day => {
        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div class="date">${day.date}</div>
            <div class="forecast-icon">
                <img src="${getWeatherIconURL(day.icon)}" alt="${day.description}">
            </div>
            <div class="temp-range">${day.temp_max}° / ${day.temp_min}°</div>
            <div class="forecast-description">${day.description}</div>
        `;
        forecastContainer.appendChild(card);
    });
    
    forecastDiv.classList.remove('hidden');
}

// Get Weather Icon URL
function getWeatherIconURL(iconCode) {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// Recent Searches
function addRecentSearch(city) {
    if (!recentSearches.includes(city)) {
        recentSearches.unshift(city);
        if (recentSearches.length > 5) {
            recentSearches.pop();
        }
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
        displayRecentSearches();
    }
}

function displayRecentSearches() {
    if (recentSearches.length === 0) {
        recentSearchesDiv.classList.add('hidden');
        return;
    }
    
    const container = document.getElementById('recentSearchesContainer');
    container.innerHTML = '';
    
    recentSearches.forEach(city => {
        const btn = document.createElement('button');
        btn.className = 'recent-search-btn';
        btn.textContent = city;
        btn.addEventListener('click', () => loadWeatherData(city));
        container.appendChild(btn);
    });
    
    recentSearchesDiv.classList.remove('hidden');
}

// Utility Functions
function showLoading(show) {
    loadingSpinner.classList.toggle('hidden', !show);
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
}

function clearError() {
    errorMessage.textContent = '';
    errorMessage.classList.remove('show');
}

// Note: To use the real OpenWeatherMap API:
// 1. Sign up at https://openweathermap.org/api
// 2. Get your API key
// 3. Replace API_KEY = 'demo' with your actual key
// 4. Uncomment the real API calls below and comment out mock data functions

/*
// Real API Call (uncomment to use)
async function getRealWeatherData(city) {
    const response = await fetch(`${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`);
    if (!response.ok) throw new Error('Weather data not found');
    return await response.json();
}

async function getRealForecastData(city) {
    const response = await fetch(`${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`);
    if (!response.ok) throw new Error('Forecast data not found');
    return await response.json();
}
*/
