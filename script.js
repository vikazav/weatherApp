let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let timeNow = document.querySelector('.time-now');
let dayNow = document.querySelector('.day-now');

// let searchBtn = document.querySelector(".btn-search");
let currentBtn = document.querySelector(".current");
let searchForm = document.querySelector(".search-form");
let cityNow = document.querySelector('.city'); 

let days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = now.getDay();
let dayFull = days[day];

let tempIcon = document.querySelectorAll(".temp-icon");

let iconCels = document.querySelector(".temp-cels");
let iconFareng = document.querySelector(".temp-fareng");

let cloudIcon = document.querySelector(".fa-solid");


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

function showTemperature(response) {
  let tempNow=Math.round(response.data.main.temp);
  let humidityNow = response.data.main.humidity;
  let windNow = Math.round(response.data.wind.speed);
  let descriptionNow= response.data.weather[0].main;
  description.innerHTML = descriptionNow;
  cloudIcon.classList.remove("fa-sun");
  cloudIcon.classList.remove("fa-cloud-rain");
  cloudIcon.classList.add("fa-cloud");
  if (descriptionNow === "Clear") {
    cloudIcon.classList.add("fa-sun");
    cloudIcon.classList.remove("fa-cloud");
  } else if (descriptionNow === "Rain") {
    cloudIcon.classList.add("fa-cloud-rain");
    cloudIcon.classList.remove("fa-cloud");
  }
  
  let currentCity = response.data.name;
  cityNow.innerHTML = currentCity;
  temp.innerHTML =tempNow;
  humidity.innerHTML = humidityNow;
  wind.innerHTML = windNow;
  tempIcon.forEach(icon => {
    icon.addEventListener('click',(e) => {
      if (e.target === iconCels) {
        temp.innerHTML = tempNow;
      }
      if (e.target ===iconFareng) {
        temp.innerHTML = Math.round(tempNow*1.8+32);
      }
    })
    })

}

function searchCity(city) {
  let apiUrl ="https://api.openweathermap.org/data/2.5/weather?"
let apiKey ="428a806b1ea72671015f9a8da5f82916";
  axios.get(`${apiUrl}q=${city}&appid=${apiKey}&units=metric`)
  .then (showTemperature);
}

searchForm.addEventListener("submit",() => {
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

currentBtn.addEventListener('click',()=> {
  
  navigator.geolocation.getCurrentPosition(handlePosition)
})

searchCity("Kyiv");




 