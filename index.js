document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.container');
  const search = document.querySelector('.search-box button');
  const weatherBox = document.querySelector('.weather-box');
  const weatherDetails = document.querySelector('.weather-details');
  const error404 = document.querySelector('.not-found');
  const mapContainer = document.getElementById('map');

  search.addEventListener('click', async () => {
    const APIKey = '944f650284ee82497256ac381e2bb4b1';
    const timezoneAPIKey = '652SGDK9YRH0'; 
    const cityInput = document.querySelector('.search-box input');
    const city = cityInput.value;

    if (city === '')
      return;

    try {
      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`);
      const json = await weatherResponse.json();

      if (json.cod === '404') {
        handleNotFoundError();
        return;
      }

      hideNotFoundError();

      const image = document.querySelector('.weather-box img');
      const temperature = document.querySelector('.weather-box .temperature');
      const description = document.querySelector('.weather-box .description');
      const humidity = document.querySelector('.weather-details .humidity span');
      const wind = document.querySelector('.weather-details .wind span');
      const feelsLike = document.querySelector('.weather-details .feels-like span');
      const pressure = document.querySelector('.weather-details .pressure span');
      const country = document.querySelector('.weather-details .country span');
      const rainVolume = document.querySelector('.weather-details .rain-volume span');
      const coordinates = document.querySelector('.weather-details .coordinates span');

      setWeatherImage(json.weather[0].main, image);
      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;
      feelsLike.innerHTML = `${json.main.feels_like ? parseInt(json.main.feels_like) : 'N/A'}<span>°C</span>`;
      pressure.innerHTML = `${json.main.pressure ? json.main.pressure : 'N/A'} hPa`;
      country.innerHTML = `${json.sys.country ? json.sys.country : 'N/A'}`;
      rainVolume.innerHTML = json.rain && json.rain['3h'] ? `${json.rain['3h']} mm` : 'N/A';
      coordinates.innerHTML = `[${json.coord.lat}, ${json.coord.lon}]`;
      const mapp=document.querySelector('.mapContainer');
      mapp.src =`https://www.google.com/maps/embed/v1/place?key=AIzaSyDiIIhCaqovxoNY9uc17ge8Q_2ns7LAiNM&q=${json.name}`;

      // extra-data
      const timezoneResponse = await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=${timezoneAPIKey}&format=json&by=position&lat=${json.coord.lat}&lng=${json.coord.lon}`);
      const timezoneData = await timezoneResponse.json();
      const timezone = timezoneData.zoneName;[[]]

      // display timezone information
      const timezoneElement = document.querySelector('.weather-details .timezone span');
      timezoneElement.innerHTML = `${timezone}`;

      const googleMapSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDiIIhCaqovxoNY9uc17ge8Q_2ns7LAiNM&q=${encodeURIComponent(city)}`;
      mapContainer.src = googleMapSrc;

      showWeatherDetails();
    } catch (error) {
      handleNotFoundError();
    }
  });

  function handleNotFoundError() {
    container.style.height = '400px';
    weatherBox.style.display = 'none';
    weatherDetails.style.display = 'none';
    error404.style.display = 'block';
    error404.classList.add('fadeIn');
  }

  function hideNotFoundError() {
    error404.style.display = 'none';
    error404.classList.remove('fadeIn');
  }

  function setWeatherImage(weatherMain, imageElement) {
    switch (weatherMain) {
      case 'Clear':
        imageElement.src = 'images/clear.png';
        break;

      case 'Rain':
        imageElement.src = 'images/rain.png';
        break;

      case 'Snow':
        imageElement.src = 'images/snow.png';
        break;

      case 'Clouds':
        imageElement.src = 'images/cloud.png';
        break;

      case 'Mist':
        imageElement.src = 'images/mist.png';
        break;

      default:
        imageElement.src = '';
    }
  }

  function showWeatherDetails() {
    error404.style.display = 'none';
    error404.classList.remove('fadeIn');
    weatherBox.style.display = '';
    weatherDetails.style.display = '';
    weatherBox.classList.add('fadeIn');
    weatherDetails.classList.add('fadeIn');
    container.style.height = '700px';
  }

});