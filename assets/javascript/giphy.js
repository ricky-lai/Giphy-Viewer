//store some buttons on the page to get the user started
var btnArr = [
    "The Office",
    "The Ozark",
    "John Wick",
    "Breaking Bad",
    "Fight Club"
]

//build a func to dynamically create a button for each 
//string in the btnArr on load, and each time
//the user adds a btn

$(document).ready(function () {

    function makeBtn() {

        //loop to create a btn for each string in btnArr
        for (i = 0; i < btnArr.length; i++) {
            var addBtn = $("<button>");
            addBtn.addClass("btn btn-primary movieBtn")
            addBtn.text(btnArr[i]);
            addBtn.attr("movieName", btnArr[i]);

            //update the html with the new btn
            $("#btnArea").append(addBtn);
        }
    }
    //call the makeBtn func
    makeBtn();



    //need to be able to add a button---
    //take the text the user inputs and add it to btnArr
    //when the submit btn is clicked
    $("#subBtn").on("click", function (event) {
        event.preventDefault();
        btnArr.push($("#inputMovie").val().trim())
        $("#btnArea").empty();
        makeBtn();
        // reset the inputMovie area to blank
        $("#inputMovie").val("")
    });



    //for when one of the movie buttons is clicked:
    //on click of button, AJAX req for search of giphy API for the text on that button
    $(document).on("click", ".movieBtn", function () {
        //console.log("hi");
        $("#gifArea").empty();
        var movieName = $(this).attr("movieName");
        var apiKey = "l4rTiwy6XT6KwlkOqVtLThMThBJYqrhU";
        // var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + movieName + "&limit=10&rating=g" ;

        var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${movieName}&limit=10`;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response.data);
            var data = response.data;
            var rating = data.rating;
            for (i = 0; i < data.length; i++) {

                var newImg = $("<img height= '250px' width= '250px'>");     //dynamically creates img with width and height req
                var p = $("<p>").text("Rating: " + data[i].rating.toUpperCase());         //get the rating from the response

                //adding classes to the new GIFs. adding a src attr so it pulls the STILL version.
                newImg.addClass("img-fluid movieGif").attr("src", data[i].images.fixed_width_still.url)
                    .attr("alt", movieName)
                    .attr("state", "still")
                    .attr("still", data[i].images.fixed_width_still.url)
                    .attr("animated", data[i].images.fixed_width.url);
                p.addClass("ratings");
                $("#gifArea").append(newImg, p);

            }
        });

    })
    //click handler for when a GIF is clicked. 
    $(document).on("click", ".movieGif", function () {

        var state = $(this).attr("state");          //creating state var for a boolean

        // if the state is still, which we know it is when it is created, then 
        // replace the still src with animated when clicked AND
        // give the state attr the value of animated from above (the animated version of the gif)

        if (state === "still") {
            $(this).attr("src", $(this).attr("animated"))
            $(this).attr("state", "animated")
        }
        // if the state does not = still when clicked, give the img the still attr
        // and set the state attr to a value of still
        else {
            $(this).attr("src", $(this).attr("still"))
            $(this).attr("state", "still")
        }
    })
});
