function formatDate(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentDay = days[now.getDay()];
  let currentMonth = months[now.getMonth()];
  let currentDate = now.getDate();
  let currentHour = now.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = now.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  return `${currentDay}, ${currentMonth} ${currentDate} at ${currentHour}:${currentMinutes}`;
}
function getForecast(coordinates) {
  let apiKey = "f27803b22003bacb0df7459dd6dc6bd9";
  let units = "metric";
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
  let temperatureElement = document.querySelector("#temp-today");
  let cityElement = document.querySelector("#city-header");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconTodayElement = document.querySelector("#icon-today");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconTodayElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "f27803b22003bacb0df7459dd6dc6bd9";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

search("Amsterdam");

let formElement = document.querySelector("#search-form");
formElement.addEventListener("submit", handleSubmit);

//°C and °F conversion
function unitConversion(event) {
  event.preventDefault();
  let tempToday = document.querySelector("#temp-today");
  if (tempF.innerHTML === "°F") {
    tempToday.innerHTML = Math.round((tempToday.innerHTML * 9) / 5 + 32);
    tempF.innerHTML = "°C";
    tempC.innerHTML = "°F";
  } else {
    tempToday.innerHTML = Math.round(((tempToday.innerHTML - 32) * 5) / 9);
    tempF.innerHTML = "°F";
    tempC.innerHTML = "°C";
  }
}
let tempC = document.querySelector(".temp-C a");
tempC.addEventListener("click", unitConversion);
let tempF = document.querySelector(".temp-F a");
tempF.addEventListener("click", unitConversion);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "f27803b22003bacb0df7459dd6dc6bd9";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let locationButton = document.querySelector(".location-button");
locationButton.addEventListener("click", getCurrentPosition);

function showForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = ` <div class="row"> `;
  let days = ["Mon", "Tue", "Wed", "Thu"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` 
    <div class="col-2" id="day-1">
    <div class="weather-forecast-day">${day}</div>
    <div class="weather-forecast-date">17-5</div>
    <div class="weather-forecast-icon">☀️</div>
    <div class="weather-forecast-temperature">
      <span class="temp-max">18°C</span>
      <span class="temp-divider"> |</span>
      <span class="temp-min"> 12°C</span>
      </div>
  </div>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
