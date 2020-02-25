//Primary function, controlled by the search button
$("#getWeather").click(function (event) {
  event.preventDefault();

  // User input city info
  let userCity = $("#getLocation").val();

  // API key and URL for weather data retrieval
  const APIKey = "166a433c57516f51dfab1f7edaed8413";
  let url = `httpss://api.openweathermap.org/data/2.5/forecast?q=${userCity}&units=imperial&appid=${APIKey}`;

  // Primary AJAX call
  $.ajax({
    url,
    method: "GET"
  }).then(function (response) {

    // Secondary URL for UV Index
    let uvUrl = `https://api.openweathermap.org/data/2.5/uvi?&units=imperial&lat=${response.city.coord.lat}&lon=${response.city.coord.lon}&appid=${APIKey}`;

    // Secondary AJAX call for UV info
    $.ajax({
      url: uvUrl,
      method: "GET"
    }).then(function (uvResponse) {

      // Grabbing elements by class and assigning API data accordingly
      $(".city").text(`${response.city.name}, ${response.city.country} (${new Date(response.list["0"].dt * 1000).toDateString()})`);
      $(".icon").attr("src", `https://openweathermap.org/img/wn/${response.list["0"].weather["0"].icon}@2x.png`);
      $(".temp").text(`Temperature: ${response.list["0"].main.temp} °F`);
      $(".wind").text(`Wind Speed: ${response.list["0"].wind.speed} MPH`);
      $(".uvIndex").text(`UV Index: ${uvResponse.value}`);
      $(".humidity").text(`Humidity: ${response.list["0"].main.humidity} %`);

      // Day 2 forecast
      $(".cityFore1").text(`${new Date(response.list["3"].dt * 1000).toDateString()}`);
      $(".iconFore1").attr("src", `https://openweathermap.org/img/wn/${response.list["3"].weather["0"].icon}@2x.png`);
      $(".tempFore1").text(`Temperature: ${response.list["3"].main.temp} °F`);
      $(".humidityFore1").text(`Humidity: ${response.list["3"].main.humidity} %`);

      // Day 3 forecast
      $(".cityFore2").text(`${new Date(response.list["11"].dt * 1000).toDateString()}`);
      $(".iconFore2").attr("src", `https://openweathermap.org/img/wn/${response.list["11"].weather["0"].icon}@2x.png`);
      $(".tempFore2").text(`Temperature: ${response.list["11"].main.temp} °F`);
      $(".humidityFore2").text(`Humidity: ${response.list["11"].main.humidity} %`);

      // Day 4 forecast
      $(".cityFore3").text(`${new Date(response.list["19"].dt * 1000).toDateString()}`);
      $(".iconFore3").attr("src", `https://openweathermap.org/img/wn/${response.list["19"].weather["0"].icon}@2x.png`);
      $(".tempFore3").text(`Temperature: ${response.list["19"].main.temp} °F`);
      $(".humidityFore3").text(`Humidity: ${response.list["19"].main.humidity} %`);

      // Day 5 forecast
      $(".cityFore4").text(`${new Date(response.list["27"].dt * 1000).toDateString()}`);
      $(".iconFore4").attr("src", `https://openweathermap.org/img/wn/${response.list["27"].weather["0"].icon}@2x.png`);
      $(".tempFore4").text(`Temperature: ${response.list["27"].main.temp} °F`);
      $(".humidityFore4").text(`Humidity: ${response.list["27"].main.humidity} %`);

      // Generating a button per city searched by user
      let prevSearch = $(`<button id="${response.city.name.replace(/\s+/g, '')}Btn" class="btn btn-list"></button><br>`).text(response.city.name);
      $("#searchCol").append(prevSearch);

      // Function that runs when city name button is clicked
      $(`#${response.city.name.replace(/\s+/g, '')}Btn`).click(function (event) {
        event.preventDefault();

        // Grabs city name depending on with button is clicked on
        let prevCity = $(this).text();
        let url = `httpss://api.openweathermap.org/data/2.5/forecast?q=${prevCity}&units=imperial&appid=${APIKey}`;

        // Repeat of AJAX calls for weather info
        $.ajax({
          url,
          method: "GET"
        }).then(function (response) {

          let uvUrl = `httpss://api.openweathermap.org/data/2.5/uvi?&units=imperial&lat=${response.city.coord.lat}&lon=${response.city.coord.lon}&appid=${APIKey}`;

          $.ajax({
            url: uvUrl,
            method: "GET"
          }).then(function (uvResponse) {
            // Grabbing elements by class and assigning API data accordingly
            $(".city").text(`${response.city.name}, ${response.city.country} (${new Date(response.list["0"].dt * 1000).toDateString()})`);
            $(".icon").attr("src", `https://openweathermap.org/img/wn/${response.list["0"].weather["0"].icon}@2x.png`);
            $(".temp").text(`Temperature: ${response.list["0"].main.temp} °F`);
            $(".wind").text(`Wind Speed: ${response.list["0"].wind.speed} MPH`);
            $(".uvIndex").text(`UV Index: ${uvResponse.value}`);
            $(".humidity").text(`Humidity: ${response.list["0"].main.humidity} %`);

            // Day 2 forecast
            $(".cityFore1").text(`${new Date(response.list["3"].dt * 1000).toDateString()}`);
            $(".iconFore1").attr("src", `https://openweathermap.org/img/wn/${response.list["3"].weather["0"].icon}@2x.png`);
            $(".tempFore1").text(`Temperature: ${response.list["3"].main.temp} °F`);
            $(".humidityFore1").text(`Humidity: ${response.list["3"].main.humidity} %`);

            // Day 3 forecast
            $(".cityFore2").text(`${new Date(response.list["11"].dt * 1000).toDateString()}`);
            $(".iconFore2").attr("src", `https://openweathermap.org/img/wn/${response.list["11"].weather["0"].icon}@2x.png`);
            $(".tempFore2").text(`Temperature: ${response.list["11"].main.temp} °F`);
            $(".humidityFore2").text(`Humidity: ${response.list["11"].main.humidity} %`);

            // Day 4 forecast
            $(".cityFore3").text(`${new Date(response.list["19"].dt * 1000).toDateString()}`);
            $(".iconFore3").attr("src", `https://openweathermap.org/img/wn/${response.list["19"].weather["0"].icon}@2x.png`);
            $(".tempFore3").text(`Temperature: ${response.list["19"].main.temp} °F`);
            $(".humidityFore3").text(`Humidity: ${response.list["19"].main.humidity} %`);

            // Day 5 forecast
            $(".cityFore4").text(`${new Date(response.list["27"].dt * 1000).toDateString()}`);
            $(".iconFore4").attr("src", `https://openweathermap.org/img/wn/${response.list["27"].weather["0"].icon}@2x.png`);
            $(".tempFore4").text(`Temperature: ${response.list["27"].main.temp} °F`);
            $(".humidityFore4").text(`Humidity: ${response.list["27"].main.humidity} %`);

            // Previous button UV closing tag
          });
          // Previous button AJAX closing tag
        });
        // Previous button on click function closing tag
      });
      // Primary UV closing tag
    });
    // Primary AJAX closing tag
  });
  // Search button closing tag
});