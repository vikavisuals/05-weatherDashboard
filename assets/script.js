// This is our API key. Add your own API key between the ""
const APIKey = "166a433c57516f51dfab1f7edaed8413";

// San+Francisco,California
let userCity = "Berlin";
let userState = "California";

// Here we are building the URL we need to query the database
let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${userCity},${userState}&units=imperial&appid=${APIKey}`;

// We then created an AJAX call
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {



  console.log(response);
  console.log(response.wind.speed);
  console.log(response.sys.country);
  let windSpeed = response.wind.speed;
  let temperature = response.main.temp;
  let cityName = response.name + ", " + response.sys.country;


 $(".city").text(`City Name: ${cityName}`);
  $(".wind").text(`Wind Speed: ${windSpeed}`);
  $(".temp").text(`Temperature: ${temperature}`);
  


  

  // Create CODE HERE to Log the queryURL
  // Create CODE HERE to log the resulting object
  // Create CODE HERE to transfer content to HTML
  // Create CODE HERE to calculate the temperature (converted from Kelvin)
  // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
  // Create CODE HERE to dump the temperature content into HTML

});