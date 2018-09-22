var topics = ["spiderman", "SpongeBob", "Avergers", "Rick And Morty"];


//renderbutton
function renderButton() {
    for (var i = 0; i < topics.length; i++) {
        var addBtn = $('<button>');
        addBtn.addClass("btn btn-info topic-btn");
        addBtn.attr("data-name", topics[i]);
        addBtn.text(topics[i]);
        $('.topBtn').prepend(addBtn);
    }
}


$('#addTopic-btn').click(function (event) {
    event.preventDefault();
    var gifpush = $("#topics-input").val().trim();
    topics.push(gifpush);
    renderButton();
})

$(document).on("click", ".topic-btn", addGif);
function addGif() {
    $(".topics-view").empty();
    var topicName = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topicName + "&api_key=dc6zaTOxFJmzC&rating= g&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var topicData = response.data;
        for (var i = 0; i < topicData.length; i++) {
            var gifDiv = $("<div>");

            var rating = topicData[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var newImage = $("<img class='newGif'>");
            newImage.attr("src", topicData[i].images.fixed_height_still.url);

            gifDiv.prepend(p);
            gifDiv.prepend(newImage);

            $(".topics-view").prepend(gifDiv);
            
        }
    })
}


renderButton();

$(document).on('click', '.newGif', function () {
    var src = $(this).attr("src");
    if ($(this).hasClass('playing')) {
        //stop
        $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
        $(this).removeClass('playing');
    } else {
        //play
        $(this).addClass('playing');
        $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
    }
})
