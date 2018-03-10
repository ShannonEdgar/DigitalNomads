alert("au");
$.ajax({
        url: 'https://cors-anywhere.herokuapp.com/https://coworkingmap.org/wp-json/spaces/united-states/sacramento',
        type: 'GET',

        headers: {
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvY293b3JraW5nbWFwLm9yZyIsImlhdCI6MTUyMDU3ODYzNCwibmJmIjoxNTIwNTc4NjM0LCJleHAiOjE1MjExODM0MzQsImRhdGEiOnsidXNlciI6eyJpZCI6IjI1MDEifX19.N2Dg7h1C2yvrg7Bh3jtEZSbJE3yCCusmuSaA0OLrAcw',
        },
        dataType: 'json',
    })
    .done(function(response_food) {
        console.log(response_food);
        renderFood(response_food);
    })
    .fail(function(error) {
        console.log(error.code);
    });