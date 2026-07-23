# 🌤️ Weather Dashboard

A modern, responsive weather dashboard built with vanilla HTML, CSS, and JavaScript that fetches real-time weather data from a public weather API.

## Features

✨ **Current Weather Display**
- Real-time temperature, humidity, wind speed, and pressure
- Feels-like temperature
- Weather condition with descriptive icons
- UV index and visibility
- Sunrise/sunset times

📅 **5-Day Forecast**
- Daily weather predictions
- Temperature ranges
- Weather conditions with icons

📍 **Location Detection**
- Search weather by city name
- Get weather for your current location (Geolocation API)
- Recent searches with quick access

🎨 **Responsive Design**
- Mobile-first approach
- Fully responsive on all devices
- Modern gradient UI with smooth animations
- Light-weight and fast loading

💾 **Local Storage**
- Saves your recent searches
- Persistent data between sessions

## Installation

1. Clone the repository:
```bash
git clone https://github.com/cypherdream/well-web.git
cd well-web
```

2. No dependencies required! Just open `index.html` in your browser.

Or use a local server:
```bash
python -m http.server 8000
# Then visit http://localhost:8000
```

## Configuration

### Using Real Weather API

The dashboard currently uses mock data for demo purposes. To use real weather data:

1. **Get an API Key:**
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - Get your free API key

2. **Update the API Key:**
   - Open `app.js`
   - Replace `const API_KEY = 'demo';` with your actual API key
   - Uncomment the real API functions at the bottom
   - Comment out the mock data functions

## Usage

1. **Search by City Name:**
   - Type a city name in the search box
   - Click "Search" or press Enter

2. **Use Your Location:**
   - Click the "📍 Use Current Location" button
   - Allow browser permission for geolocation

3. **Recent Searches:**
   - Click any city from the recent searches list
   - Up to 5 most recent searches are saved

## File Structure

```
well-web/
├── index.html          # HTML structure
├── styles.css          # Styling and responsive design
├── app.js              # JavaScript functionality
├── package.json        # Project metadata
└── README.md           # Documentation
```

## Technology Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **API:** OpenWeatherMap API
- **Storage:** Browser LocalStorage
- **Responsive:** CSS Grid & Flexbox
- **Icons:** OpenWeatherMap Weather Icons

## Weather Data Provided

- Current temperature
- Feels-like temperature
- Humidity level
- Wind speed
- Atmospheric pressure
- Visibility distance
- UV index
- Sunrise/sunset times
- 5-day weather forecast
- Weather conditions with icons

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- [ ] Weather alerts and warnings
- [ ] Historical weather data
- [ ] Weather charts and graphs
- [ ] Air quality index
- [ ] Multiple location tracking
- [ ] Dark/Light theme toggle
- [ ] Weather notifications
- [ ] Hourly forecast

## API Rate Limits

OpenWeatherMap Free tier:
- 60 calls/minute
- 1,000,000 calls/month
- 1,000 calls/day on free API

## License

MIT License - feel free to use this project for personal and commercial purposes.

## Support

For issues or suggestions, please open an issue on GitHub.

## Demo Cities

The demo mode includes weather data for:
- London, UK
- New York, USA
- Tokyo, Japan
- Sydney, Australia
- Paris, France

Try searching for any of these cities to see the dashboard in action!
