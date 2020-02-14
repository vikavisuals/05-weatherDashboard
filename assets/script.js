//Primary function, controlled by the search button
$("#getWeather").click(function (event) {
  event.preventDefault();

  // User input city info
  let userCity = $("#getLocation").val();

  // API key and URL for weather data retrieval
  const APIKey = "166a433c57516f51dfab1f7edaed8413";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&units=imperial&appid=${APIKey}`;

  // Primary AJAX call
  $.ajax({
    url,
    method: "GET"
  }).then(function (response) {

    // Secondary URL for UV Index
    let uvUrl = `http://api.openweathermap.org/data/2.5/uvi?&units=imperial&lat=${response.coord.lat}&lon=${response.coord.lon}&appid=${APIKey}`;

    // Secondary AJAX call for UV info
    $.ajax({
      url: uvUrl,
      method: "GET"
    }).then(function (uvResponse) {

      // Grabbing elements by class and assigning API data accordingly
      $(".city").text(`${response.name}, ${response.sys.country} (${new Date(response.dt * 1000).toDateString()})`);
      $(".icon").attr("src", `http://openweathermap.org/img/wn/${response.weather["0"].icon}@2x.png`);
      $(".temp").text(`Temperature: ${response.main.temp} °F`);
      $(".wind").text(`Wind Speed: ${response.wind.speed} MPH`);
      $(".uvIndex").text(`UV Index: ${uvResponse.value}`);
      $(".humidity").text(`Humidity: ${response.main.humidity} %`);


      // Setting user search city name to local storage
      localStorage.setItem(response.name, response);

      // Generating a button per city searched by user
      let prevSearch = $(`<button id="${response.name}Btn"></button><br>`).text(response.name);
      $("#searchCol").append(prevSearch);

      // Function that runs when city name button is clicked
      $(`#${response.name}Btn`).click(function (event) {
        event.preventDefault();

        // Grabs city name depending on with button is clicked on
        let prevCity = $(this).text();
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${prevCity}&units=imperial&appid=${APIKey}`;

        // Repeat of AJAX calls for weather info
        $.ajax({
          url,
          method: "GET"
        }).then(function (response) {

          let uvUrl = `http://api.openweathermap.org/data/2.5/uvi?&units=imperial&lat=${response.coord.lat}&lon=${response.coord.lon}&appid=${APIKey}`;

          $.ajax({
            url: uvUrl,
            method: "GET"
          }).then(function (uvResponse) {

            $(".city").text(`${response.name}, ${response.sys.country} (${new Date(response.dt * 1000).toDateString()})`);
            $(".icon").attr("src", `http://openweathermap.org/img/wn/${response.weather["0"].icon}@2x.png`);
            $(".temp").text(`Temperature: ${response.main.temp} °F`);
            $(".wind").text(`Wind Speed: ${response.wind.speed} MPH`);
            $(".uvIndex").text(`UV Index: ${uvResponse.value}`);
            $(".humidity").text(`Humidity: ${response.main.humidity} %`);

            // Previous button UV closing tag
          });

          // Previous button AJAX closing tag
        });

        // Previous button on click function closing tag
      });

      // URL for weather forecast API
      let foreUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${userCity}&units=imperial&appid=${APIKey}`;

      // Forecast AJAX call
      $.ajax({
        url: foreUrl,
        method: "GET"
      }).then(function (responseFore) {

        // $(".cityFore").text(`${new Date(responseFore.dt * 1000).toDateString()}`);
        // $(".iconFore").attr("src", `http://openweathermap.org/img/wn/${response.weather["0"].icon}@2x.png`);
        // $(".tempFore").text(`Temperature: ${responseForee.main.temp} °F`);
        // $(".humidityFore").text(`Humidity: ${responseFore.main.humidity} %`);

        console.log(responseFore);


        // Forecast API closing tag
      });

      // Primary UV closing tag
    });



    // Primary AJAX closing tag
  });

  // Search button closing tag
});