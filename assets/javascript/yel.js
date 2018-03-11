aalert('hi');
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
    renderFood(response_food)
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





        const proxyurl = "https://shielded-hamlet-43668.herokuapp.com/";

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": proxyurl + "https://api.yelp.com/v3/businesses/" + id + "/reviews",
            "method": "GET",
            "headers": {
                "Authorization": "Bearer jtdOtf_Nw2aFD-KE_uZwAWGiQB2cNb9sApKVKV_3Bzbhlg0fjZ6lIqmNdziHcaBr47Hd9F3Myyt2eWEm_HmNmoRjMA2bc_znA3M1kYzLKcFxJJ-Mx9wLkmd68JswWnYx",
            }
        }
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
    for (let i = 1; i < 6; i++) {
        $(".food" + i).html(data.businesses[i].name);
        console.log("food" + i)
        console.log(data.businesses[i].name);
        var foodInfo = $("<li>").addClass("list-group-sub food" + i + "sub");
        var foodRating = foodInfo.html("<span>" + "Rating: " + data.businesses[i].rating + "</span>");
        var foodAdress = $(".food" + i + "sub").html("Address: " + data.businesses[i].location.address1 + ", " + data.businesses[i].location.city + ", " + data.businesses[i].location.zip_code);
        $(".food" + i + "sub").append(foodRating);
        $(".food" + i + "sub").append(foodAdress);


        console.log(foodAdress)





    }


    var food_card = $("<div>").addClass("card trail");
    // var food_card1 = $("<div>").addClass("card trail");
    food_card.attr("uid", id).attr("city", data.businesses[i].location.city);
    var food_card_name = $("<div>").addClass("card-header").html(name);
    var food_card_review = $("<p>").addClass("card-header").html(review0);
    var food_location = $("<div>").addClass("list-group yelp_clear_float col-sm-12").html(directions);
    var food_image = $("<img>").addClass("list-group yelp_images yelp_title").attr("src", yelp_image);

    // food_card1.append(food_card_name);
    // food_card1.append(food_location);
    food_card.append(food_image);
    $("#food-result").append(food_card);
    // $("yelp_info").append(food_card1);
    food_card.append(food_card_name);
    food_card.append(food_location);

    if (rating) {
        var yelp_stars_size = Math.max(0, (Math.min(6, rating))) * 16;
        var yelp_rating_stars = $("<span>").html("<span style='width:" + yelp_stars_size + "px'></span>");
        yelp_rating_stars.addClass("stars");
        var yelp_rating = $("<li>").addClass("list-group-item trail_rating").html("<span>" + rating + "</span>");
        yelp_rating.append(yelp_rating_stars);
        food_card.append(yelp_rating);
        food_card.append(food_card_review);
    }
}