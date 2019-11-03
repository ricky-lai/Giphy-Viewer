//store some buttons on the page to get the user started
var searches = [
    "Agriculture",
    "Communism",
    "Airports",
    "Cactus",
    "Banana",
    "Royalty",
    "Sports",
    "Cobblers",
]

var userSearch = "";

function buttons() {
    $("#btnArea").empty();

    for (var i = 0; i < searches.length; i++) {
        $("#btnArea").append("<button type='button'>" + searches[i] + "</button>");
    }
}

$("#subBtn").on("click", function () {
    event.preventDefault();
    searches.push($("#userIn").val().trim());
    userSearch = $("#userIn").val().trim();
    buttons();
    api();
    // console.log("dfjdlas");
});

$("body").on("click", "img", function () {

    var current = $(this);
    if (current.attr("data-state") === "still") {
        current.attr("data-state", "play");
        current.attr("src", current.attr("data-play"));
    }

    else if (current.attr("data-state") === "play") {
        current.attr("data-state", "still");
        current.attr("src", current.attr("data-still"));


    }
});

$("#btnArea").on("click", "button", function () {

    var current2 = $(this).text();
    userSearch = current2;
    api();


});

function api() {
    console.log(userSearch);
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=s8PI78OwluPEkf244n0XuATmutASEWg6&q=" + userSearch + "&limit=10&offset=0&rating=G&lang=en"

    $.ajax({
        url: queryURL,
        type: "GET"
    }).then(function (response) {
        var data = response.data;
        for (var i = 0; i < 10; i++) {
            var rating = data[i].rating;
            var title = data[i].title;
            var image = data[i].images.fixed_height.url;
            var still = data[i].images.fixed_height_still.url;

            var final = $("<div>");
            var img = $("<img src='" + still + "'data-play='" + image + "'data-still='" + still + "'data-state='still'>");
            var text = $("<p>" + title + "</p>");
            var text2 = $("<p>" + rating + "</p>");


            final.append(img, text, text2);
            $("#gifArea").append(final);
        }


        console.log(response);

    });


}
buttons();





