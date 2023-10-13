const api = {
  key: "6dc5722cd330a9643f629e993fd45f5c",
  base: "https://api.openweathermap.org/data/2.5/",
};
const button = document.querySelector(".btn");
const city_name = document.querySelector("#input");
city_name.addEventListener("keypress", setQuery);

function setQuery(e) {
  if (e.keyCode == 13) {
    getResults(city_name.value);
    city_name.value = "";
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric&lang=fr`)
    .then((response) => response.json())
    .then((data) => {
      const temperature = data.main.temp;
      const weather = data.weather[0].main;
      switch (weather) {
        case "Clouds":
          document.getElementById("container").style.backgroundImage =
            "url(./img/cloudy.jpg)";
          break;
        case "Fog":
          document.getElementById("container").style.backgroundImage =
            "url(./img/fog.jpg)";
          break;
        case "Mist":
          document.getElementById("container").style.backgroundImage =
            "url(./img/fog.jpg)";
          break;
        case "Rain":
          document.getElementById("container").style.backgroundImage =
            "url(./img/rain.jpg)";
          break;
        case "Snow":
          document.getElementById("container").style.backgroundImage =
            "url(./img/snowy.jpg)";
          break;
        case "Thunderstorm":
          document.getElementById("container").style.backgroundImage =
            "url(./img/storm.jpg)";
          break;
        default:
          document.getElementById("container").style.backgroundImage =
            "url(./img/sunny.jpg)";
          break;
      }

      const low = data.main.temp_min;
      const hi = data.main.temp_max;
      const wind = data.wind.speed;
      const country = data.sys.country;
      const name = data.name;

      let now = new Date();
      let dateLocale = now.toLocaleString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const city_HTML = document.querySelector("#city");
      city_HTML.innerText = `${name}, ${country}`;
      const date = document.querySelector("#date");
      date.innerText = `${dateLocale}`;

      const temperature_HTML = document.querySelector("#temp");
      temperature_HTML.innerText = `${Math.round(temperature)}°C`;

      const weather_HTML = document.querySelector("#climate");
      weather_HTML.innerText = `${weather}`;
      const lowhi_HTML = document.querySelector("#low-hi");
      lowhi_HTML.innerText = `${Math.round(low)}°c / ${Math.round(hi)}°c`;

      const wind_HTML = document.querySelector("#wind");
      wind_HTML.innerHTML = `Wind<br />${Math.round(wind)}m/s`;
    });
}
