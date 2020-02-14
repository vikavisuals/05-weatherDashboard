

$("#getWeather").click(function (event) {
  event.preventDefault();

  let userCity = $("#getLocation").val();

  const APIKey = "166a433c57516f51dfab1f7edaed8413";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&units=imperial&appid=${APIKey}`;

  $.ajax({
    url,
    method: "GET"
  }).then(function (response) {

    let uvUrl = `http://api.openweathermap.org/data/2.5/uvi?lat=${response.coord.lat}&lon=${response.coord.lon}&appid=${APIKey}`;

    $.ajax({
      url: uvUrl,
      method: "GET"
    }).then(function (uvResponse) {

      let date = new Date(response.dt * 1000).toDateString();
      let icon = `http://openweathermap.org/img/wn/${response.weather["0"].icon}@2x.png`;

      $(".city").text(response.name + ", " + response.sys.country);
      $(".date").text(date);
      $(".icon").attr("src", icon);
      $(".temp").text(`Temperature: ${response.main.temp}`);
      $(".wind").text(`Wind Speed: ${response.wind.speed}`);
      $(".uvIndex").text(`UV Index: ${uvResponse.value}`);
      $(".humidity").text(`Humidity: ${response.main.humidity}`);

    })


    localStorage.setItem(response.name, response);
    localStorage.getItem(response.name);

    let prevSearch = $("<button></button>").text(response.name);
    $("#searchCol").append(prevSearch);
  });







});