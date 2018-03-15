var map, places, infoWindow;
var markers = [];
var autocomplete;
var countryRestrict = {
    country: "us",
};
var MARKER_PATH = "http://www.googlemapsmarkers.com/v1/";
var MARKER_COLOR;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: {
            lat: -33.867,
            lng: 151.206,
        },
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        streetViewControl: false,
    });

    infoWindow = new google.maps.InfoWindow({
        content: document.getElementById("info-content"),
    });

    // Create the autocomplete object and associate it with the UI input control.
    // Restrict the search to the default country, and to place type "cities".
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */
        (document.getElementById("userCity")), {
            types: ["(cities)"],
        }
    );
    places = new google.maps.places.PlacesService(map);

    autocomplete.addListener("place_changed", onPlaceChanged);
}
//clearMarkers();

// When the user selects a city, get the place details for the city and
// zoom the map in on the city.
function onPlaceChanged() {
    var place = autocomplete.getPlace();
    if (place.geometry) {
        map.panTo(place.geometry.location);
        map.setZoom(15);
        search("bike share");
        search("food");
        search("coworking space");
    } else {
        document.getElementById("autocomplete").placeholder = "Enter a city";
    }
}

// Search for hotels in the selected city, within the viewport of the map.
function search(keyword) {
    var color;
    var search = {
        bounds: map.getBounds(),
        keyword: keyword,
    };

    places.nearbySearch(search, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            console.log(results);
            // clearResults();
            // clearMarkers();
            // Create a marker for each hotel found, and
            // assign a letter of the alphabetic to each marker icon.
            if (keyword == "food") {
                color = "/ff0000/";
            } else if (keyword == "bike share") {
                color = "/0099FF/";
            } else if (keyword == "coworking space") {
                color = "/99ff33/";
            }

            for (var i = 0; i < results.length; i++) {
                var markerLetter = String.fromCharCode("A".charCodeAt(0) + i % 26);
                var markerIcon = MARKER_PATH + markerLetter + color;
                // Use marker animation to drop the icons incrementally on the map.
                markers[i] = new google.maps.Marker({
                    position: results[i].geometry.location,
                    animation: google.maps.Animation.DROP,
                    icon: markerIcon,
                });
                // If the user clicks a hotel marker, show the details of that hotel
                // in an info window.
                markers[i].placeResult = results[i];
                google.maps.event.addListener(markers[i], "click", showInfoWindow);
                setTimeout(dropMarker(i), i * 100);
                // addResult(results[i], i);
            }
        }
    });
}

function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i]) {
            markers[i].setMap(null);
        }
    }
    markers = [];
}

function dropMarker(i) {
    return function() {
        markers[i].setMap(map);
    };
}

function addResult(result, i) {
    var results = document.getElementById("results");
    var markerLetter = String.fromCharCode("A".charCodeAt(0) + i % 26);
    var markerIcon = MARKER_PATH + markerLetter + ".png";

    var tr = document.createElement("tr");
    tr.style.backgroundColor = i % 2 === 0 ? "#F0F0F0" : "#FFFFFF";
    tr.onclick = function() {
        google.maps.event.trigger(markers[i], "click");
    };

    var iconTd = document.createElement("td");
    var nameTd = document.createElement("td");
    var icon = document.createElement("img");
    icon.src = markerIcon;
    icon.setAttribute("class", "placeIcon");
    icon.setAttribute("className", "placeIcon");
    var name = document.createTextNode(result.name);
    iconTd.appendChild(icon);
    nameTd.appendChild(name);
    tr.appendChild(iconTd);
    tr.appendChild(nameTd);
    results.appendChild(tr);
}

function clearResults() {
    var results = document.getElementById("results");
    while (results.childNodes[0]) {
        results.removeChild(results.childNodes[0]);
    }
}

// Get the place details for a hotel. Show the information in an info window,
// anchored on the marker for the hotel that the user selected.
function showInfoWindow() {
    var marker = this;
    places.getDetails({
            placeId: marker.placeResult.place_id,
        },
        function(place, status) {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                return;
            }
            infoWindow.open(map, marker);
            buildIWContent(place);
        }
    );
}

// Load the place information into the HTML elements used by the info window.
function buildIWContent(place) {
    document.getElementById("iw-icon").innerHTML =
        '<img class="hotelIcon" ' + 'src="' + place.icon + '"/>';
    document.getElementById("iw-url").innerHTML =
        '<b><a href="' + place.url + '">' + place.name + "</a></b>";
    document.getElementById("iw-address").textContent = place.vicinity;

    if (place.formatted_phone_number) {
        document.getElementById("iw-phone-row").style.display = "";
        document.getElementById("iw-phone").textContent =
            place.formatted_phone_number;
    } else {
        document.getElementById("iw-phone-row").style.display = "none";
    }

    // Assign a five-star rating to the hotel, using a black star ('&#10029;')
    // to indicate the rating the hotel has earned, and a white star ('&#10025;')
    // for the rating points not achieved.
    if (place.rating) {
        var ratingHtml = "";
        for (var i = 0; i < 5; i++) {
            if (place.rating < i + 0.5) {
                ratingHtml += "&#10025;";
            } else {
                ratingHtml += "&#10029;";
            }
            document.getElementById("iw-rating-row").style.display = "";
            document.getElementById("iw-rating").innerHTML = ratingHtml;
        }
    } else {
        document.getElementById("iw-rating-row").style.display = "none";
    }

    // The regexp isolates the first part of the URL (domain plus subdomain)
    // to give a short URL for displaying in the info window.
    if (place.website) {
        var fullUrl = place.website;
        var website = hostnameRegexp.exec(place.website);
        if (website === null) {
            website = "http://" + place.website + "/";
            fullUrl = website;
        }
        document.getElementById("iw-website-row").style.display = "";
        document.getElementById("iw-website").textContent = website;
    } else {
        document.getElementById("iw-website-row").style.display = "none";
    }
}
var userCity;

$(document).ready(function() {
    //
    var zip = "";
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
            ?
            $register.attr("disabled", true) :
            $register.removeAttr("disabled");
    });

    //$('#userCity').validate({
    //rules: {
    //field: {
    //required: true,
    //minlength: 3
    //}
    //}
    //});
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDYMiYaFsfVgiaaHVjIL5HRtgoRcrND9-E",
        authDomain: "dignomads-ef4c8.firebaseapp.com",
        databaseURL: "https://dignomads-ef4c8.firebaseio.com",
        projectId: "dignomads-ef4c8",
        storageBucket: "dignomads-ef4c8.appspot.com",
        messagingSenderId: "74241661347"
    };
    firebase.initializeApp(config);
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
        $("#welcome").remove();
        $(".container2").empty();
        var headImg = $("<img>")
            .attr("id", "header-image")
            .attr("src", "assets/images/header.png");

        $(".container2").append(headImg);
        $("#welcome").empty();

        $("#mainInfo").css("visibility", "visible");
        //console.log(userCity);
        callFood(userCity);
        callCoWorkers(userCity);
        callBike(userCity);
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

            foodCont.append(foodRating);
            foodCont.append(foodName);
            foodCont.append(foodAddress);
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
        //console.log(qUrlCoworkers);

        $.ajax({
            url: qUrlCoworkers,
            type: "GET",
            headers: {
                Authorization: "Bearer _XHOfGt95IoxLfo2BdXxO5NC47aozRuVeDtWe_0kYXUkEfQwzL0McIpptuWt-7vhelkhk_APoDaRnmhHOP_h4s3trwNISuCoUYuPdSxJ1mp_vAo1HNv-wDcG-AabWnYx",
            },

            //data: YourData,
        }).done(function(coworkersData) {
            renderCoWorkers(coworkersData);
            console.log(coworkersData);
        });
    }

    function renderCoWorkers(response) {
        $(".coworker-text").empty();
        for (var i = 0; i < response.businesses.length; i++) {
            var nameCoworkers = response.businesses[i].name;
            var addressCoWorkers = response.businesses[i].location.address1;
            var addressCoWorkers2 = response.businesses[i].location.address2;
            var addressCoWorkers3 = response.businesses[i].location.address3;
            var addressCoWorkersCity = response.businesses[i].location.city;
            var addressCoWorkersCountry = response.businesses[i].location.country;
            var addressCoWorkersState = response.businesses[i].location.state;
            var addressCoWorkerszip_code = response.businesses[i].location.zip_code;
            var ratingCoworkers = response.businesses[i].rating;
            var priceCoworkers = response.businesses[i].price;
            zip = response.businesses[i].location.zip_code;
            var coworkersCont = $("<div>").addClass("coworkerscont");
            var coworkersName = $("<h3>")
                .addClass("coworkers-name")
                .html(response.businesses[i].name);
            var coworkersAddress = $("<p>")
                .addClass("coworkers-address")
                .html(
                    addressCoWorkers +
                    " " +
                    addressCoWorkers2 +
                    " " +
                    addressCoWorkers3 +
                    " " +
                    addressCoWorkersCity +
                    " " +
                    addressCoWorkersState +
                    " " +
                    addressCoWorkerszip_code
                );
            var coworkersRating = $("<p>")
                .addClass("coworkers-rating")
                .html("Rating: " + response.businesses[i].rating);

            coworkersCont.append(coworkersRating);
            coworkersCont.append(coworkersName);
            coworkersCont.append(coworkersAddress);
            $(".coworker-text").append(coworkersCont);
        }
        callWeather(userCity);
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

            var bikeCont = $("<div>").addClass("bikecont");
            var bikeName = $("<h3>")
                .addClass("bike-name")
                .html(response.results[i].name);
            var bikeAddress = $("<p>")
                .addClass("bike-address")
                .html(response.results[i].formatted_address);

            bikeCont.append(bikeName);
            bikeCont.append(bikeAddress);

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
            zip +
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
                    .html(tempFahrenheit + " &#8457");
                var tempC = $("<p>")
                    .addClass("temp-c")
                    .html(tempCelsius + " &#8451");
                var descr = $("<p>")
                    .addClass("decription")
                    .html(weatherDescription);
                var category = $("<p>")
                    .addClass("category")
                    .html(weatherCategory);
                var weatherIcon = $("<img>")
                    .addClass("weather-icom")
                    .attr(
                        "src",
                        "http://openweathermap.org/img/w/" +
                        response.weather[0].icon +
                        ".png"
                    );

                var iconCode = response.weather[0].icon;
                var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
                weatherCont.append(city);
                weatherCont.append(tempF);
                weatherCont.append(tempC);
                weatherCont.append(descr);
                weatherCont.append(category);
                weatherCont.append(weatherIcon);

                $(".weather-text").append(weatherCont);
            })

        .fail(function(error) {
            console.log(error.code);
        });
    }
});