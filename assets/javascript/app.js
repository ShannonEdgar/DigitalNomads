$(document).ready(function() {
  var div = $("<div>");
  var p = $("<p>");
  var userCity = $("#userCity").val();

  $("#search-btn").on("click", function() {
    console.log(userCity);
  });
});

 window.addEventListener('load', function() {
 console.log(localStorage)
})


      