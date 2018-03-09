console.log("ready");

var qurl = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=bike+share+in+South+Lake+Tahoe,CA&key=AIzaSyC3E53VXFugQfWd0SzS8k7C5oXrAZ7_6PE";



$.ajax({

  url: qurl,
  method: "GET"

})
  .done(function (data) {
    console.log(data);
    renderBusiness(data);

  });

function renderBusiness(response) {
  $("#div1").empty();
  for (var i = 0; i < 5; i++) {
    var name = response.results[i].name;
    var address = response.results[i].formatted_address;
    console.log(name);
    console.log(address);
    $(".bikeShop" + i).html(response.results[i].name);
    $(".bikeShop" + i + "ad").html(response.results[i].formatted_address);


  }
}

