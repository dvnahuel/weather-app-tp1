const geoApiUrl = 'https://api.openweathermap.org/geo/1.0/direct';
const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'b888c358507b12e839f178770e433ddc';


const input = document.getElementById("city");
input.addEventListener("keyup", async function(event) {
    if (event.key !== "Enter") {
      return
    }

    const city = input.value // "Buenos aires"
    const geolocation = await getGeolocation(city)
    const weather = await getWeather(geolocation)

    showWeather(weather)
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
    tempMax: data.main.temp_max,
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


function showWeather (weather) {
  const result = document.getElementById("result");
  result.innerText = JSON.stringify(weather, null, 2)
}