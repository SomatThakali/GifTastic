// Stores the gifs when  the user added
var gifs = [];

// function that will  display the gifs of the user choice
function displayGifs() {
  var gif = $(this).attr("data-name");
  var queryURL =
    "http://api.giphy.com/v1/gifs/search?q=" +
    gif +
    "&apikey=YmxqI7FO8HBg0777IhN53zTCSpS5f2zO&limit=12";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    $("#gif-view").empty();

    var results = response.data;
    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div class='col-md-3'>");
      var rating = results[i].rating;
      var p = $("<p class='text-center'>").text("Rating: " + rating);
      gifDiv.append(p);

      var animalImage = $("<img>");

      var imgURL = results[i].images.fixed_height_still.url;
      animalImage.attr("src", imgURL);

      var imgURLStill = results[i].images.fixed_height_still.url;
      var imgURLAnimate = results[i].images.fixed_height.url;

      animalImage.attr("data-still", imgURLStill);
      animalImage.attr("data-animate", imgURLAnimate);

      gifDiv.append(animalImage);
      $("#gif-view").prepend(gifDiv);

      // Change to either animate or still
      changeImageState();
    }

    console.log(response);
    // console.log(imgURL);
  });
}

function changeImageState() {
  $("img").hover(
    function() {
      var animateImage = $(this).attr("data-animate");
      $(this).attr("src", animateImage);

      console.log("STILL");
    },
    function() {
      var stillImage = $(this).attr("data-still");
      $(this).attr("src", stillImage);

      console.log("MOVE");
    }
  );
}
function renderButtons() {
  $("#buttons-view").empty();

  for (var i = 0; i < gifs.length; i++) {
    var btn = $("<button class='btn btn-primary mr-2'>");
    btn.addClass("gif-btn");
    btn.attr("data-name", gifs[i]);
    btn.text(gifs[i]);
    $("#buttons-view").append(btn);
  }
}

$("#add-gif").on("click", function(event) {
  event.preventDefault();
  var gif = $("#gif-input")
    .val()
    .trim();
  gifs.push(gif);

  renderButtons();
  $("#gif-input").val("");
  submitButtonDisable();
});

// This function will  disable the submit button if the input field is empty
// link: https://stackoverflow.com/questions/17699094/if-input-field-is-empty-disable-submit-button?answertab=active#tab-top
// author: Raja Muhammad Adil
// author profile: https://stackoverflow.com/users/1298762/adil
function submitButtonDisable() {
  $("#add-gif").attr("disabled", true);
  $("#gif-input").keyup(function() {
    if ($(this).val().length != 0) $("#add-gif").attr("disabled", false);
    else $("#add-gif").attr("disabled", true);
  });
}

$(document).on("click", ".gif-btn", displayGifs);

renderButtons();
submitButtonDisable();