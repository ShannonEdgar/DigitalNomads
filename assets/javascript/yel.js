alert("hi")
var yelpKey = "_XHOfGt95IoxLfo2BdXxO5NC47aozRuVeDtWe_0kYXUkEfQwzL0McIpptuWt-7vhelkhk_APoDaRnmhHOP_h4s3trwNISuCoUYuPdSxJ1mp_vAo1HNv-wDcG-AabWnYx";
var yelpUrl = "https://api.yelp.com/v3/businesses/search";
var city = "";
$.ajax({
    url: 'https://api.yelp.com/v3/businesses/search?term=restaurant&location=Sacramento',
    type: 'POST',
    dataType: 'jsonp',
    headers: {
        'Authorization': 'Bearer _XHOfGt95IoxLfo2BdXxO5NC47aozRuVeDtWe_0kYXUkEfQwzL0McIpptuWt-7vhelkhk_APoDaRnmhHOP_h4s3trwNISuCoUYuPdSxJ1mp_vAo1HNv-wDcG-AabWnYx'
    },

    //data: YourData,
}).done(function(response_food) {
    console.log(response_food);
});