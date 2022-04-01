var lat = 0,
  lon = 0;

$(document).ready(function() {
  if (navigator && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(succesGetPos, errorGetPos);
  }
  $("#search").submit(getCityWeather);
  $("#unit").click(unitConversion);
});

function succesGetPos(pos) {
  var openWeatherURL = "",
    corsAwURL = "https://cors-anywhere.herokuapp.com/";

  lat = pos.coords.latitude;
  lon = pos.coords.longitude;
  openWeatherURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid=3d3b5a9ac6383aca1ebce6fe9865189d";
  $.getJSON(corsAwURL + openWeatherURL, openWeatherCall);

  return 0;
}

function errorGetPos() {
  alert("Failed to get current position.");

  return -1
}

function openWeatherCall(json) {
  $("#city").val(json.name + ", " + json.sys.country);
  $("#temp").html(json.main.temp.toFixed(1));
  $("#hum").html(json.main.humidity);
  $("#icon").html("<img src='http://openweathermap.org/img/w/" + json.weather[0]["icon"] + ".png'>");
  $("#weather").html(json.weather[0]["description"]);

  return 0;
}

function getCityWeather() {
  var openWeatherQuery = "http://api.openweathermap.org/data/2.5/weather?q=",
    cityName = $("#city").val(),
    appid = "&units=metric&appid=3d3b5a9ac6383aca1ebce6fe9865189d",
    corsAwURL = "https://cors-anywhere.herokuapp.com/";

  $.getJSON(corsAwURL + openWeatherQuery + cityName + appid, openWeatherCall);

  return 0;
}

function unitConversion() {
  var T = $("#temp").html(),
    unit = $("#unit").html();

  if (unit == "°C") {
    T = (T * 1.8) + 32;
    $("#temp").html(T.toFixed(1));
    $("#unit").html("°F");
  } else {
    T = (T - 32) / 1.8;
    $("#temp").html(T.toFixed(1));
    $("#unit").html("°C");
  }

  return 0;
}
