// This is our API key
var APIKey = "166a433c57516f51dfab1f7edaed8413";
var userCity = "Sacramento";
var tempFahrenheit = "";
var tempCelsius = "";
var weatherDescription = "";
var weatherCategory = "";

// Here we are building the URL we need to query the database
var queryURL =
  "https://api.openweathermap.org/data/2.5/weather?" +
  "q=" +
  userCity +
  "&appid=" +
  APIKey;

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
  url: queryURL,
  method: "GET",
})
  // We store all of the retrieved data inside of an object called "response"
  .then(function(response) {
    // Log the queryURL
    console.log(queryURL);

    // Log the resulting object
    console.log(response);

    // Transfer content to HTML
    //  $(".city").html("<h1>" + response.name + " Weather Details</h1>");
    //  $(".wind").text("Wind Speed: " + response.wind.speed);
    //  $(".humidity").text("Humidity: " + response.main.humidity);
    //  $(".temp").text("Temperature (F) " + response.main.temp);

    // Log the data in the console as well
    console.log("Temperature (F): " + response.main.temp);
    console.log("Description: " + response.weather[0].main);
    console.log("Category: " + response.weather[0].description);

    tempFahrenheit = Math.floor(response.main.temp * 9 / 5 - 459.67);
    tempCelsius = Math.floor(response.main.temp - 273.15);
    var weatherCategory = response.weather[0].description;

    function capitalizeFirstLetter(weatherCategory) {
      return weatherCategory.charAt(0).toUpperCase() + weatherCategory.slice(1);
    }

    console.log(tempFahrenheit);
    console.log(tempCelsius);
    console.log(capitalizeFirstLetter(weatherCategory));
  });
