var result;
var btnFind = document.getElementById("btnFind");
var inputFind = document.getElementById("inputFind");
var alert = document.getElementById("alert");
btnFind.addEventListener("click", function () {
  if (validate()) {
    getWeather(inputFind.value);
    alert.classList.replace("d-block", "d-none");
  } else {
    alert.classList.replace("d-none", "d-block");
  }
});
function validate() {
  var regex = /^[a-zA-Z]{3,}$/;
  return regex.test(inputFind.value);
}
async function getWeather(location) {
  var response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=19f83790ab3443a8a4f01744250402&q=${location}&days=3`,
    { method: "GET" }
  );
  result = await response.json();
  display();
  clearInput();
}
function display() {
  var cartona = ``;
  var currentDay = new Date(result.current.last_updated);
  var tomorrow = new Date(result.forecast.forecastday[1].date);
  var theThirdDay = new Date(result.forecast.forecastday[2].date);
  cartona = `<div class="col-lg-4">
                        <div class="item-one bg-second rounded-2">
                            <div class="head bg-first d-flex justify-content-between align-items-center p-2 rounded-2">
                                <span>${currentDay.toLocaleString("en-us", {
                                  weekday: "long",
                                })}</span>
                                <span>${currentDay.getDate()}${currentDay.toLocaleString(
    "en-us",
    { month: "long" }
  )}</span>
                            </div>
                            <div class="body py-4 ps-3">
                                <h2 class="m-0">${result.location.name}</h2>
                                <h3>${
                                  result.current.temp_c
                                }<span class="selesies">o</span>C</h3>
                                <img src="https:${
                                  result.current.condition.icon
                                }" alt="${result.current.condition.text}" />
                                <p>${result.current.condition.text}</p>
                                <div class="mt-3">
                                    <span class="me-3"><img src="images/icon-umberella.png" alt="" /> ${
                                      result.current.humidity
                                    }%</span>
                                    <span class="me-3"><img src="images/icon-wind.png" alt="" /> ${
                                      result.current.wind_kph
                                    }km/h</span>
                                    <span><img src="images/icon-compass.png" alt="" /> ${
                                      result.current.wind_dir
                                    }</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="item-two text-center rounded-2">
                            <div class="head p-2 rounded-2">
                                <span>${tomorrow.toLocaleString("en-us", {
                                  weekday: "long",
                                })}</span>
                            </div>
                            <div class="body pt-5">
                                <img src="https:${
                                  result.forecast.forecastday[1].day.condition
                                    .icon
                                }" alt="${
    result.forecast.forecastday[1].day.condition.text
  }" />
                                <h4 class="mb-0">${
                                  result.forecast.forecastday[1].day.maxtemp_c
                                }<span class="selesies">o</span>C</h4>
                                <h5>${
                                  result.forecast.forecastday[1].day.mintemp_c
                                }<span class="selesies">o</span></h5>
                                <p class="mt-3">${
                                  result.forecast.forecastday[1].day.condition
                                    .text
                                }</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="item-three bg-second text-center rounded-2">
                            <div class="head bg-first p-2 rounded-2">
                                <span>${theThirdDay.toLocaleString("en-us", {
                                  weekday: "long",
                                })}</span>
                            </div>
                            <div class="body pt-5">
                                <img src="https:${
                                  result.forecast.forecastday[2].day.condition
                                    .icon
                                }" alt="${
    result.forecast.forecastday[2].day.condition.text
  }" />
                                <h4 class="mb-0">${
                                  result.forecast.forecastday[2].day.maxtemp_c
                                }<span class="selesies">o</span>C</h4>
                                <h5>${
                                  result.forecast.forecastday[2].day.mintemp_c
                                }<span class="selesies">o</span></h5>
                                <p class="mt-3">${
                                  result.forecast.forecastday[2].day.condition
                                    .text
                                }</p>
                            </div>
                        </div>
                    </div>`;
  document.getElementById("rowData").innerHTML = cartona;
}
function clearInput() {
  inputFind.value = "";
}
getWeather("cairo");
