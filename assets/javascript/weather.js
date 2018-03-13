// This is our API key
var APIKey = '166a433c57516f51dfab1f7edaed8413';
var userCity = 'Sacramento';
var tempFahrenheit = '';
var tempCelsius = '';
var weatherDescription = '';
var weatherCategory = '';

// Here we are building the URL we need to query the database
var queryURL =
  'https://api.openweathermap.org/data/2.5/weather?' +
  'q=' +
  userCity +
  '&appid=' +
  APIKey;

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
  url: queryURL,
  method: 'GET'
})
  // We store all of the retrieved data inside of an object called "response"
  .then(function(response) {
    // Log the queryURL
    console.log(queryURL);

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

    // Log the data in the console as well
    console.log('Temperature (F): ' + response.main.temp);
    console.log('Description: ' + response.weather[0].main);
    console.log('Category: ' + response.weather[0].description);

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
