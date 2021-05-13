function showTemperature(response) {
  let temperatureElement = document.querySelector("#temp-today");
  let cityElement = document.querySelector("#city-header");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "f27803b22003bacb0df7459dd6dc6bd9";
let units = "metric";
let cityName = "Amsterdam";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(showTemperature);
