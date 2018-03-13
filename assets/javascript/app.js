$(document).ready(function() {
    var userCity = "";
    var div = $("<div>");
    var p = $("<p>");
    var map;
    var service;
    var infowindow;

    getCity();

    callFood(userCity);
    callCoWorkers(userCity);
    callBike(userCity);
    callWeather(userCity);

    function getCity() {
        userCity = localStorage.getItem("city");
        console.log(userCity);
    }

    var config = {
        apiKey: "AIzaSyDYMiYaFsfVgiaaHVjIL5HRtgoRcrND9-E",
        authDomain: "dignomads-ef4c8.firebaseapp.com",
        databaseURL: "https://dignomads-ef4c8.firebaseio.com",
        projectId: "dignomads-ef4c8",
        storageBucket: "",
        messagingSenderId: "74241661347",
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    function callFood() {
        var proxy = "https://cors-anywhere.herokuapp.com/";
        var urlFood =
            "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurant+in+";
        var key = "AIzaSyBY3JtHC9_vtnbcRjse-wqSdzdpIr2Awak";
        var qUrlFood = proxy + urlFood + userCity + "&key=" + key;
        // console.log(qUrlFood);
        // console.log(userCity);
        $.ajax({
                url: qUrlFood,
                method: "GET",
            })
            .done(function(foodData) {
                // console.log(foodData);
                renderFood(foodData);
            })
            .fail(function(error) {
                // console.log(error.code);
            });
    }

    $("#current-city").text(userCity);

    function renderFood(response) {
        $(".food-text").empty();
        for (var i = 0; i < response.results.length; i++) {
            var nameFood = response.results[i].name;
            // console.log(nameFood);
            var addressFood = response.results[i].formatted_address;
            var ratingFood = response.results[i].rating;
            var priceFood = response.results[i].price_level;
            var foodCont = $("<div>").addClass("foodcont");

            var foodName = $("<h3>")
                .addClass("food-name")
                .html(response.results[i].name);
            var foodAddress = $("<p>")
                .addClass("food-address")
                .html(response.results[i].formatted_address);
            var foodRating = $("<p>")
                .addClass("food-rating")
                .html("Rating: " + response.results[i].rating + " ");
            var foodPrice = $("<p>")
                .addClass("food-price")
                .html("Price: " + response.results[i].price_level);
            foodCont.append(foodRating);
            foodCont.append(foodName);
            foodCont.append(foodAddress);
            foodCont.append(foodPrice);
            $(".food-text").append(foodCont);
        }
    }

    function callCoWorkers() {
        var yelpKey = '_XHOfGt95IoxLfo2BdXxO5NC47aozRuVeDtWe_0kYXUkEfQwzL0McIpptuWt-7vhelkhk_APoDaRnmhHOP_h4s3trwNISuCoUYuPdSxJ1mp_vAo1HNv-wDcG-AabWnYx';
        var yelpUrl = "https://api.yelp.com/v3/businesses/search?term=coworking%20space";


        var proxy = 'https://shielded-hamlet-43668.herokuapp.com/';
        var qUrlCoworkers = proxy + yelpUrl + '&location=' + userCity;
        console.log(qUrlCoworkers);

        $.ajax({
            url: qUrlCoworkers,
            type: 'GET',
            headers: {
                Authorization: 'Bearer _XHOfGt95IoxLfo2BdXxO5NC47aozRuVeDtWe_0kYXUkEfQwzL0McIpptuWt-7vhelkhk_APoDaRnmhHOP_h4s3trwNISuCoUYuPdSxJ1mp_vAo1HNv-wDcG-AabWnYx',
            },

            //data: YourData,
        }).done(function(coworkersData) {
            console.log(coworkersData);
            renderCoWorkers(coworkersData);
        });
    }


    /*function callCoWorkers() {
        var proxy = "https://cors-anywhere.herokuapp.com/";
        var urlCoworkers = "https://coworkingmap.org/wp-json/spaces/united-states/";
        var qUrlCoworkers = proxy + urlCoworkers + userCity;

        $.ajax({
                url: qUrlCoworkers,
                type: "GET",

                headers: {
                    Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvY293b3JraW5nbWFwLm9yZyIsImlhdCI6MTUyMDU3ODYzNCwibmJmIjoxNTIwNTc4NjM0LCJleHAiOjE1MjExODM0MzQsImRhdGEiOnsidXNlciI6eyJpZCI6IjI1MDEifX19.N2Dg7h1C2yvrg7Bh3jtEZSbJE3yCCusmuSaA0OLrAcw",
                },
                dataType: "json",
            })
            .done(function(coWorkersData) {
                // console.log(coWorkersData);
                renderCoWorkers(coWorkersData);
            })
            .fail(function(error) {
                // console.log(error.code);
            });
    }*/

    function renderCoWorkers(response) {
        $(".coworker-text").empty();
        for (var i = 0; i < response.businesses.length; i++) {
            var nameCoworkers = response.businesses[i].name;
            var addressCoWorkers = response.businesses[i].display_address;
            var ratingCoworkers = response.businesses[i].rating;
            var priceCoworkers = response.businesses[i].price;
            var zip = response.businesses[i].location.zip_code;
            var coworkersCont = $("<div>").addClass("coworkerscont");
            var coworkersName = $('<h3>')
                .addClass('coworkers-name')
                .html(response.businesses[i].name);
            var coworkersAddress = $('<p>')
                .addClass('coworkers-address')
                .html(response.businesses[i].display_address);
            var coworkersRating = $('<p>')
                // .addClass('coworkers-rating')
                .html("Rating: " + response.businesses[i].rating);                
            var coworkersPrice = $('<p>')
                .addClass('coworkers-price')
                .html("Price: " + response.businesses[i].price);
            coworkersCont.append(coworkersRating);
            coworkersCont.append(coworkersName);
            coworkersCont.append(coworkersAddress);
            coworkersCont.append(coworkersPrice);
            $(".coworker-text").append(coworkersCont);
        }
    }

    function callBike() {
        var proxy = "https://cors-anywhere.herokuapp.com/";
        var urlBike =
            "https://maps.googleapis.com/maps/api/place/textsearch/json?query=bike+share+in+";
        var key = "AIzaSyC3E53VXFugQfWd0SzS8k7C5oXrAZ7_6PE";
        var qUrlBike = proxy + urlBike + userCity + "&key=" + key;
        $.ajax({
                url: qUrlBike,
                method: "GET",
            })
            .done(function(bikeData) {
                // console.log(bikeData);
                renderBike(bikeData);
            })
            .fail(function(error) {
                // console.log(error.code);
            });
    }

    function renderBike(response) {
        $(".bike-text").empty();
        for (var i = 0; i < response.results.length; i++) {
            var nameBike = response.results[i].name;
            var addressBike = response.results[i].formatted_address;
            var ratingBike = response.results[i].rating;
            var bikeCont = $("<div>").addClass("bikecont");
            var bikeName = $("<h3>")
                .addClass("bike-name")
                .html(response.results[i].name);
            var bikeAddress = $("<p>")
                .addClass("bike-address")
                .html(response.results[i].formatted_address);
            var bikeRating = $("<p>")
                .addClass("bike-rating")
                .html("Rating: " + response.results[i].rating);
            bikeCont.append(bikeName);
            bikeCont.append(bikeAddress);
            // bikeCont.append(bikeRating);
            $(".bike-text").append(bikeCont);
        }
    }

    function callWeather() {
        var APIKey = "166a433c57516f51dfab1f7edaed8413";
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
        $.ajax({ url: queryURL, method: "GET" })
            // We store all of the retrieved data inside of an object called "response"
            .then(function(response) {
                // Log the queryURL
                console.log(queryURL);
                //renderWeather(weatherData)

                // Log the resulting object
                console.log(response);

                // Log the data in the console as well
                // console.log("Temperature (F): " + response.main.temp);
                // console.log("Description: " + response.weather[0].main);
                // console.log("Category: " + response.weather[0].description);

                tempFahrenheit = Math.floor(response.main.temp * 9 / 5 - 459.67);
                tempCelsius = Math.floor(response.main.temp - 273.15);
                var weatherCategory = response.weather[0].description;

                function capitalizeFirstLetter(weatherCategory) {
                    return (
                        weatherCategory.charAt(0).toUpperCase() + weatherCategory.slice(1)
                    );
                }

                console.log(tempFahrenheit);
                console.log(tempCelsius);
                console.log(capitalizeFirstLetter(weatherCategory));
                $(".weather-text").empty();
                var weatherCont = $("<div>").addClass("weathercont");
                var city = $("<h3>")
                    .addClass("city")
                    .html(userCity);
                var tempF = $("<p>")
                    .addClass("temp-f")
                    .html(tempFahrenheit);
                var tempC = $("<p>")
                    .addClass("temp-c")
                    .html(tempCelsius);
                var descr = $("<p>")
                    .addClass("decription")
                    .html(weatherDescription);
                var category = $("<p>")
                    .addClass("category")
                    .html(weatherCategory);
                weatherCont.append(city);
                weatherCont.append(tempF);
                weatherCont.append(tempC);
                weatherCont.append(descr);
                weatherCont.append(category);
                $(".weather-text").append(weatherCont);
                $("#display-weather").text("Current Temperature (F): " + tempFahrenheit + " " + " (C): "  + tempCelsius);
                $("#display-weather-sm").text(response.weather[0].description);
        
            });
    }
    var map;
    var infowindow;
});