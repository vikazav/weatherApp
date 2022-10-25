let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let timeNow = document.querySelector('.time-now');
let dayNow = document.querySelector('.day-now');

let currentBtn = document.querySelector(".current");
let searchForm = document.querySelector(".search-form");
let cityNow = document.querySelector('.city'); 

let days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = now.getDay();
let dayFull = days[day];

let tempIcon = document.querySelectorAll(".temp-icon");

let iconCels = document.querySelector(".temp-cels");
let iconFareng = document.querySelector(".temp-fareng");

let icon = document.querySelector(".icon");


if(minutes <10) {
  minutes ="0"+minutes;
}
if(hours < 10) {
  hours ="0"+hours;
}

timeNow.innerHTML = `${hours} : ${minutes}`;
dayNow.innerHTML = dayFull;

let temp = document.querySelector('.temp');
let humidity =document.querySelector('.humidity');
let wind =document.querySelector('.wind');
let inputCity = document.querySelector('.input-city');
let description = document.querySelector('.description');

function formatDay(timestamp) {
  let date = new Date(timestamp*1000);
  let day= date.getDay();
  let days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;

let forecastElement = document.querySelector(".forecast");

  let forecastHtml = `<div class = "row">`;

  forecast.forEach((forecastDay, index) => {
    if (index <6 ) {
  forecastHtml = forecastHtml +
 `<div class="col-2 item">
 <div class="card" style="width: 5rem;">
   <div class="card-body">
     <h5 class="card-title">${formatDay(forecastDay.dt)}</h5>
     <img class = "forecast-icon" alt="forecast icon" src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}.png">
  
     <p class="card-text"><strong>${Math.round(forecastDay.temp.max)}</strong>  <sup><small>&#176;C</small></sup></p>
      <p class="card-text min-temp">${Math.round(forecastDay.temp.min)} <sup><small>&#176;C</small></sup></p>
    </div>
 </div>
 </div>`
    }
  });
  forecastHtml = forecastHtml+`</div>`;
  forecastElement.innerHTML = forecastHtml;
}
function getForecast(coordinates) {
  let apiUrl ="https://api.openweathermap.org/data/2.5/onecall?"
  let apiKey ="7784a4cd4aa2e0c25ead7bd96d585b8a";
    axios.get(`${apiUrl}lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`)
    .then (showForecast);
}
function showTemperature(response) {
  let tempNow=Math.round(response.data.main.temp);
  let humidityNow = response.data.main.humidity;
  let windNow = Math.round(response.data.wind.speed);
  let descriptionNow= response.data.weather[0].main;
  description.innerHTML = descriptionNow;
  icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`);
  let currentCity = response.data.name;
  cityNow.innerHTML = currentCity;
  temp.innerHTML =tempNow;
  humidity.innerHTML = humidityNow;
  wind.innerHTML = windNow;
  tempIcon.forEach(icon => {
    icon.addEventListener('click',(e) => {
      if (e.target === iconCels) {
        temp.innerHTML = tempNow;
        iconCels.classList.add("active");
        iconFareng.classList.remove("active");
      }
      if (e.target ===iconFareng) {
        temp.innerHTML = Math.round(tempNow*1.8+32);
        iconFareng.classList.add("active");
        iconCels.classList.remove("active");

      }
    })
    })
getForecast(response.data.coord);
}

function searchCity(city) {
  let apiUrl ="https://api.openweathermap.org/data/2.5/weather?"
let apiKey ="428a806b1ea72671015f9a8da5f82916";
  axios.get(`${apiUrl}q=${city}&appid=${apiKey}&units=metric`)
  .then (showTemperature);
}
searchCity("Kyiv");

searchForm.addEventListener("submit",(e) => {
  e.preventDefault();
  let inputCityValue = inputCity.value;
  cityNow.innerHTML = inputCityValue;
  searchCity(inputCityValue);
})

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl ="https://api.openweathermap.org/data/2.5/weather?"
  let apiKey ="428a806b1ea72671015f9a8da5f82916";
  axios.get(`${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
  .then (showTemperature);
}

currentBtn.addEventListener('click',(e)=> {
  e.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition)
})




 