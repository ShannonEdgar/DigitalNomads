alert("food")
var qurl =
    'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurant+in+Sacramento&key=AIzaSyBY3JtHC9_vtnbcRjse-wqSdzdpIr2Awak';

$.ajax({
    url: qurl,
    method: 'GET',
}).done(function(data) {
    console.log(data);
    renderBusiness(data);
});


function renderBusiness(response) {
    $('#div1').empty();
    for (var i = 0; i < 5; i++) {
        var name = response.results[i].name;
        var address = response.results[i].formatted_address;
        console.log(name);
        console.log(address);
        $('.bikeShop' + i).html(response.results[i].name);
        $('.bikeShop' + i + 'ad').html(response.results[i].formatted_address);
    }
}