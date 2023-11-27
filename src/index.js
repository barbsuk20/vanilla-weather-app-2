let celsius = 0;
function refreshWeather(response) {
  let temperatureElement = document.querySelector("#current-temp");
  let temperature = Math.round(response.data.temperature.current);
  let cityName = document.querySelector("#city");
  let country = document.querySelector("#country");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#current-time");
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector("#weather-icon");
  celsius = temperature;

  cityName.innerHTML = response.data.city;
  country.innerHTML = response.data.country;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  temperatureElement.innerHTML = temperature;
  timeElement.innerHTML = formatDate(date);
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;
  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = `31f697f233da06aa04dbt2b68de8ob94`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}

function searchSumit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value.trim();
  searchCity(searchInput.value);
}

let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", searchSumit);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "31f697f233da06aa04dbt2b68de8ob94";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div id="weather-forecast">
      <div class="row">
        <div class="col-2">
          <div class="weather-forecast-date">${formatDay(day.time)}</div>
          <img src="${day.condition.icon_url}" class="weather-forecast-icon">
          <div class="weather-forecast-temperatures">
            <div class="max-temp">
              <strong>${Math.round(day.temperature.maximum)}º</strong>
            </div>
            <div class="min-temp">${Math.round(day.temperature.minimum)}º</div>
          </div>
       </div>
      </div>
    </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function changeTemp() {
  let tempCel = document.querySelector("#current-temp");
  tempCel.innerHTML = celsius;
}

function changeTempFahr() {
  let tempFahr = document.querySelector("#current-temp");
  let fahr = Math.round((celsius * 9) / 5 + 32);
  tempFahr.innerHTML = fahr;
}

let changeCel = document.querySelector("#unit-celsius");
changeCel.addEventListener("click", changeTemp);

let changeFah = document.querySelector("#unit-fahr");
changeFah.addEventListener("click", changeTempFahr);

searchCity("London");
