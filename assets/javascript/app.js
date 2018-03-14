function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -33.8688, lng: 151.2195 },
    zoom: 13,
    mapTypeId: "roadmap",
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById("userCity");
  var searchBox = new google.maps.places.SearchBox(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location,
        })
      );

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

/*var map;
var infowindow;
var city, latitude, longitude;
var map;
var service;
function initMap() {
    var mapProp = {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    map = new google.maps.Map(document.getElementById(map), mapProp);
}
function initMap() {
    var pyrmont = {
        lat: -33.867,
        lng: 151.195,
    };
    map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 15,
    });
    var autocomplete = new google.maps.places.searchBox(input);
    autocomplete.bindTo('bounds', map);
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
            location: pyrmont,
            radius: 500,
            type: ['store'],
        },
        callback
    );
}
function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}
function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
    });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}
function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -33.8688,
            lng: 151.2195,
        },
        zoom: 13,
        mapTypeId: 'roadmap',
    });
    // Create the search box and link it to the UI element.
    var input = document.getElementById('userCity');
    var searchBox = new google.maps.places.Autocomplete(input, {
        types: ['(cities)'],
    });
    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });
    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();
        if (places.length == 0) {
            return;
        }
        // Clear out the old markers.
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];
        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log('Returned place contains no geometry');
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25),
            };
            // Create a marker for each place.
            markers.push(
                new google.maps.Marker({
                    map: map,
                    icon: icon,
                    title: place.name,
                    position: place.geometry.location,
                })
            );
            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
} */
var userCity;

$(document).ready(function() {
  //
  var $input = $("input"),
    $register = $("#search-btn");
  $register.attr("disabled", true);

  // Prevent submit with empty field
  $input.keyup(function() {
    var trigger = false;
    $input.each(function() {
      if (!$(this).val()) {
        trigger = true;
      }
    });
    trigger
      ? $register.attr("disabled", true)
      : $register.removeAttr("disabled");
  });

  //$('#userCity').validate({
  //rules: {
  //field: {
  //required: true,
  //minlength: 3
  //}
  //}
  //});
  $("#userCity").keyup(function(event) {
    if ($(this).val() == "" || $(this).val() == " " || $(this).val() == "  ") {
      event.preventDefault();
    } else if (event.keyCode === 13) {
      $("#search-btn").click();
    }
  });

  $("#search-btn").on("click", function() {
    userCity = $("input")
      .val()
      .trim();
    var localUserCity = userCity;
    localStorage.clear();
    localStorage.setItem("city", localUserCity);

    $("#mainInfo").removeClass("invisible");
    $("#map-container").removeClass("invisible");
    $("#videoID").remove();
    $(".container2").empty();
    var headImg = $("<img>")
      .attr("id", "header-image")
      .attr("src", "assets/images/header.png");

    $(".container2").append(headImg);
    $("#welcome").empty();

    $("#mainInfo").css("visibility", "visible");
    console.log(userCity);
    callFood(userCity);
    callCoWorkers(userCity);
    callBike(userCity);
    callWeather(userCity);
  });

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
});

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
      .html("Rating: " + response.results[i].rating);
    var foodPrice = $("<p>")
      .addClass("food-rating")
      .html("Price: " + response.results[i].price_level);
    foodCont.append(foodName);
    foodCont.append(foodAddress);
    foodCont.append(foodRating);
    foodCont.append(foodPrice);
    $(".food-text").append(foodCont);
  }
}

function callCoWorkers() {
  var yelpKey =
    "_XHOfGt95IoxLfo2BdXxO5NC47aozRuVeDtWe_0kYXUkEfQwzL0McIpptuWt-7vhelkhk_APoDaRnmhHOP_h4s3trwNISuCoUYuPdSxJ1mp_vAo1HNv-wDcG-AabWnYx";
  var yelpUrl =
    "https://api.yelp.com/v3/businesses/search?term=coworking%20space";

  var proxy = "https://shielded-hamlet-43668.herokuapp.com/";
  var qUrlCoworkers = proxy + yelpUrl + "&location=" + userCity;
  console.log(qUrlCoworkers);

  $.ajax({
    url: qUrlCoworkers,
    type: "GET",
    headers: {
      Authorization:
        "Bearer _XHOfGt95IoxLfo2BdXxO5NC47aozRuVeDtWe_0kYXUkEfQwzL0McIpptuWt-7vhelkhk_APoDaRnmhHOP_h4s3trwNISuCoUYuPdSxJ1mp_vAo1HNv-wDcG-AabWnYx",
    },

    //data: YourData,
  }).done(function(coworkersData) {
    console.log(coworkersData);
    renderCoWorkers(coworkersData);
  });
}

function renderCoWorkers(response) {
  $(".coworker-text").empty();
  for (var i = 0; i < response.businesses.length; i++) {
    var nameCoworkers = response.businesses[i].name;
    var addressCoWorkers = response.businesses[i].display_address;
    var ratingCoworkers = response.businesses[i].rating;
    var priceCoworkers = response.businesses[i].price;
    var zip = response.businesses[i].location.zip_code;
    var coworkersCont = $("<div>").addClass("coworkerscont");
    var coworkersName = $("<h3>")
      .addClass("coworkers-name")
      .html(response.businesses[i].name);
    var coworkersAddress = $("<p>")
      .addClass("coworkers-address")
      .html(response.businesses[i].display_address);
    var coworkersRating = $("<p>")
      .addClass("coworkers-rating")
      .html("Rating: " + response.businesses[i].rating);
    var coworkersPrice = $("<p>")
      .addClass("coworkers-price")
      .html("Price: " + response.businesses[i].price);

    coworkersCont.append(coworkersName);
    coworkersCont.append(coworkersAddress);
    coworkersCont.append(coworkersRating);
    coworkersCont.append(coworkersPrice);
    $(".coworker-text").append(coworkersCont);
  }
}

function callBike() {
  var proxy = "https://cors-anywhere.herokuapp.com/";
  var urlBike =
    "https://maps.googleapis.com/maps/api/place/textsearch/json?query=bike+share+in+";
  var key = "AIzaSyBY3JtHC9_vtnbcRjse-wqSdzdpIr2Awak";
  var qUrlBike = proxy + urlBike + userCity + "&key=" + key;
  $.ajax({
    url: qUrlBike,
    method: "GET",
  })
    .done(function(bikeData) {
      console.log(bikeData);
      renderBike(bikeData);
    })
    .fail(function(error) {
      console.log(error.code);
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
    bikeCont.append(bikeRating);
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
    })

    .fail(function(error) {
      console.log(error.code);
    });
}
