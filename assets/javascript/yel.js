alert('hi');
var yelpKey = '_XHOfGt95IoxLfo2BdXxO5NC47aozRuVeDtWe_0kYXUkEfQwzL0McIpptuWt-7vhelkhk_APoDaRnmhHOP_h4s3trwNISuCoUYuPdSxJ1mp_vAo1HNv-wDcG-AabWnYx';
var yelpUrl = 'https://api.yelp.com/v3/businesses/search';
var limit = "&limit=5";
var city = 'Sacramento';
var attributes = '&attributes=hot_and_new';
var proxy = 'https://shielded-hamlet-43668.herokuapp.com/';
var qurl = proxy + yelpUrl + '&location' + city + limit + attributes;
console.log(qurl);


$.ajax({
    url: 'https://shielded-hamlet-43668.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurant&location=Sacramento&categories=restaurants,All',
    type: 'GET',
    headers: {
        'Authorization': 'Bearer _XHOfGt95IoxLfo2BdXxO5NC47aozRuVeDtWe_0kYXUkEfQwzL0McIpptuWt-7vhelkhk_APoDaRnmhHOP_h4s3trwNISuCoUYuPdSxJ1mp_vAo1HNv-wDcG-AabWnYx'
    },


    //data: YourData,
}).done(function(response_food) {
    console.log(response_food);
    renderFood(response_food);
});

function renderFood(data) {

    $("#food-result").empty();

    for (var i = 0; i < 5; i++) {

        var name = data.businesses[i].name;
        var rating = "Rating: " + data.businesses[i].rating;
        var directions = "Address: " + data.businesses[i].location.address1 + "," + data.businesses[i].location.city + "," + data.businesses[i].location.zip_code;
        var id = data.businesses[i].id;
        var country = data.businesses[i].location.country;
        var yelp_image = data.businesses[i].image_url;
        var price = data.businesses[i].price;

        var proxyurl = "https://shielded-hamlet-43668.herokuapp.com/";

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": proxyurl + "https://api.yelp.com/v3/businesses/" + id + "/reviews",
            "method": "GET",
            "headers": {
                "Authorization": "Bearer jtdOtf_Nw2aFD-KE_uZwAWGiQB2cNb9sApKVKV_3Bzbhlg0fjZ6lIqmNdziHcaBr47Hd9F3Myyt2eWEm_HmNmoRjMA2bc_znA3M1kYzLKcFxJJ-Mx9wLkmd68JswWnYx",
            }
        };
        var review0;
        $.ajax(settings)
            .done(function(response_food) {
                console.log(response_food.reviews[0].text);
                review0 = response_food.reviews[0].text;

            })
            .fail(function(error) {
                console.log(error.code);
            });


    }
    for (var i = 1; i < 6; i++) {
        $(".food" + i).html(data.businesses[i].name);
        console.log("food" + i);
        console.log(data.businesses[i].name);
        console.log(data.businesses[i].price);
        var foodInfo = $("<li>").addClass("list-group-sub food" + i + "sub");
        var foodRating = foodInfo.html("<span>" + "Rating: " + data.businesses[i].rating + "</span>");
        var foodAdress = $(".food" + i + "sub").html("Address: " + data.businesses[i].location.address1 + ", " + data.businesses[i].location.city + ", " + data.businesses[i].location.zip_code);
        var foodPrice = $(".food" + i + "sub").html("Price: " + data.businesses[i].price);
        $(".food" + i + "sub").append(foodRating);
        $(".food" + i + "sub").append(foodAdress);
        $(".food" + i + "sub").append(foodPrice);


        console.log(foodAdress);
    }
}