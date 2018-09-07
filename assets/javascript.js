$(document).ready(function () {

    //On Click event will fire-up on submit
    $("#submit").on("click", function (event) {

        event.preventDefault();

        //Clear the Images from Display Div
        $(".display").empty();

        //Contruct the URL for Ajax Call
        let tags = $("#search").val().trim();
        let api_key = "f2ba31d6e559e52608a3f3435bd13dbd";
        let URL = 'https://api.flickr.com/services/rest/?' + $.param({
            'method': 'flickr.photos.search',
            'api_key': api_key,
            'tags': tags,
            'per_page': "25",
            'safe_search': '1',
            'format': 'json',
            'nojsoncallback': '1'
        });

        //Clear the text input Box
        $('#search').val('');

        //AJAX CALL to URL
        $.ajax({
            url: URL,
            method: "GET"
        }).then(function (response) {

            //checking if any error and display the error on screen
            if (response.stat === "fail") {
                var error = $("<p>").text(response.message);
                $(".display").append(error);


            } else {
                let result = response.photos.photo;
                let result_length = result.length;

                //Checking if response has photo data, append the photo to screen, Else display message no result found
                if (result_length > 0) {
                    for (let i = 0; i < result_length; i++) {

                        let title = $("<p>").text("Title: " + result[i].title);
                        let farm_id = result[i].farm;
                        let server_id = result[i].server;
                        let id = result[i].id + "_" + result[i].secret + "_b";
                        let image_src = "https://farm" + farm_id + ".staticflickr.com/" + server_id + "/" + id + ".jpg";
                        let div = $("<div>");
                        div.attr("class", "image_div")
                        let image = $("<img>");

                        image.attr("src", image_src);
                        image.attr("class", "responsive")
                        div.append(title);
                        div.append(image);

                        $(".display").append(div);

                    }
                }
                else {
                    let not_found = $("<p>").text("SORRY, Couldn't find the image you are looking for!!!");
                    $(".display").append(not_found);
                }
            }
        })
    })
});
