$(document).ready(function() {
  // This is our API key
  var APIKey = "166a433c57516f51dfab1f7edaed8413";
  var tempFahrenheit = "";
  var tempCelsius = "";
  var weatherDescription = "";
  var weatherCategory = "";
  var userCity = "fairfield";

  // Here we are building the URL we need to query the database
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    userCity +
    "&appid=" +
    APIKey;

  //this fires the function for now until we put it into app.js and is fired on "submit"
  weatherGo();

  function weatherGo() {
    //Here we run our AJAX call to the OpenWeatherMap
    $.ajax({
      url: queryURL,
      method: "GET",
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {
        // Log the queryURL

        //Log the resulting object
        console.log(response);
        console.log("Description: " + response.weather[0].main);
        console.log("Category: " + response.weather[0].description);

        tempFahrenheit = Math.floor(response.main.temp * 9 / 5 - 459.67);
        tempCelsius = Math.floor(response.main.temp - 273.15);
        var weatherCategory = response.weather[0].description;

        function capitalizeFirstLetter(weatherCategory) {
          return (
            weatherCategory.charAt(0).toUpperCase() + weatherCategory.slice(1)
          );
        }

        console.log("Temp (F): " + tempFahrenheit);
        console.log("Temp (C): " + tempCelsius);
        //this is the description that will be tied to the icons
        console.log(
          capitalizeFirstLetter("Category (for the icons): " + weatherCategory)
        );
      });
  }
});
