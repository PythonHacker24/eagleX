const items = document.querySelectorAll(".item");
const text = document.querySelectorAll(".item__right__text");
const date = document.querySelector(".left__top__date");
const temp = document.querySelector(".left__data__info__temp");
const wind = document.querySelectorAll(".left__details__item__detail")[0];
const pressure = document.querySelectorAll(".left__details__item__detail")[1];
const humidity = document.querySelectorAll(".left__details__item__detail")[2];
const image = document.querySelector(".left__weatherIcon");

const today = new Date();
const option = { weekday: "long", month: "long", day: "numeric" };
date.innerHTML = today.toLocaleDateString("en-US", option);

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
let lat, long;

function success(pos) {
  const crd = pos.coords;
  console.log(crd);
  document.querySelector(
    ".left__top__icon__name"
  ).innerHTML = `${crd.latitude}, ${crd.longitude}`;
  lat = crd.latitude;
  long = crd.longitude;
  return [crd.latitude, crd.longitude];
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

console.log(items.length);

items.forEach((item, index) => {
  item.addEventListener("click", (e) => {
    e.currentTarget.classList.toggle("item__selected");
    checkIfOn(e.currentTarget)
      ? (text[index].innerHTML = "Turned On")
      : (text[index].innerHTML = "Turned Off");
    // e.currentTarget.classList.toggle("selected");
    // e.currentTarget.children;
  });
});

function checkIfOn(item) {
  if (item.classList.contains("item__selected")) {
    return true;
  }
  return false;
}

navigator.geolocation.getCurrentPosition(success, error, options);
fetch(
  `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}8&lon=${long}&appid={API key}`
).then((response) => {
  temp.innerHTML = response.current.temp;
  wind.innerHTML = response.current.wind_speed + "Km/h";
  pressure.innerHTML = response.current.pressure + "hPa";
  humidity.innerHTML = response.current.humidity + "%";
  if (response.current.weather.main == "Clouds") {
    image.innerHTML = `
      <img src = "./Icons/rain.png"></img>
    `;
  }
  //thunder
  else if (response.current.weather.main == "Thunderstorm") {
    image.innerHTML = `
      <img src = "./Icons/thunder.png"></img>
    `;
  } else {
    image.innerHTML = `
      <img src = "./Icons/icons8.sun.svg"></img>
    `;
  }
});
