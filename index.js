const geoApiUrl = 'https://api.openweathermap.org/geo/1.0/direct';
const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'b888c358507b12e839f178770e433ddc';

const apiGifUrl = 'https://api.giphy.com/v1/gifs/search';
const apiGifKey = 'JA6R2IK7iHdW4igy0YWGdZoZRYgR6H5X';


const input = document.getElementById("city");
input.addEventListener("keyup", async function(event) {
    if (event.key !== "Enter") {
      return
    }

    const city = input.value // "Buenos aires"
    const geolocation = await getGeolocation(city)
    if (!geolocation) {
      alert("No se encontro esta ubicación, busca con otra ubicación. Ejmp: Buenos Aires, Argentina 🇦🇷")
    }

    const weather = await getWeather(geolocation)
    if (!geolocation) {
      alert("No se encontro esta ubicación, busca con otra ubicación. Ejmp: Buenos Aires, Argentina 🇦🇷")
    }

    const weatherStatus = weather.status
    const gifyQuery = `Weather ${weatherStatus}`
    const imageURL = await getGifUrl(gifyQuery)

    console.log(imageURL, imageURL)

    showWeather({ weather, imageURL })
});


async function getWeather({ lat, lon }){
  const url = weatherApiUrl + `?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();

  return {
    tempMax: data.main.temp_max,
    tempMin: data.main.temp_min,
    humidity: data.main.humidity,
    feelsLike: data.main.feels_like,
    pressure: data.main.pressure,
    windSpeed: data.wind.speed,
    status: data.weather[0].main
  }
  // console.log(data);
  // console.log(data.main);
  // console.log(data.main.temp_max);
  // console.log(data.main.temp_min);
  // console.log(data.main.humidity);
  // console.log(data.main.feels_like);
  // console.log(data.main.pressure);
  // console.log(data.weather[0].main);
  // console.log(data.wind.speed);
}


async function getGeolocation(city){
  const url = geoApiUrl + `?q=${city}&limit=${1}&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  if (!data.length) {
    return null
  } 

  const lat = data[0].lat;
  const lon = data[0].lon;

  return {
    lat,
    lon
  }
}


async function getGifUrl(query){
  const url = `${apiGifUrl}?q=${query}&api_key=${apiGifKey}&limit=1`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  console.log(data.data[0].images.original.url);
  const gif = data.data[0].images.fixed_width.url;
  return gif;
}


function showWeather ({ weather, imageURL }) {
  document.getElementById('feelsLike').textContent = weather.feelsLike + '°C';
  document.getElementById('maxTemp').textContent = weather.tempMax + '°C';
  document.getElementById('minTemp').textContent = weather.tempMin + '°C';
  document.getElementById('humidity').textContent = weather.humidity + '%';
  document.getElementById('pressure').textContent = weather.pressure;
  document.getElementById('windSpeed').textContent = weather.windSpeed + 'km/h';

  document.getElementById('gif').src = imageURL;
}