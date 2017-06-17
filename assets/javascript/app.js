  

	var categories= ["Stranger Things", "The Great British Baking Show", " The Simpsons", "House of Cards"];

	//displayImages();
	displayButtons();
	buttonClick();
	clickImage();


	function displayButtons() {
		$("#buttons-div").empty();
		for (var i = 0; i < categories.length; i++) {
			var button = $('<button>');
			button.addClass("topic-button");
			button.attr("id", categories[i]);
			button.attr("value", i);
			button.html(categories[i]);
			$("#buttons-div").append(button);
		};
	};

	function displayImages(i) {
		var url = "https://api.giphy.com/v1/gifs/search";
		url += '?' +$.param({
		'api_key': "dc6zaTOxFJmzC",
		'q': categories[i],
		'limit': 10,
		});

			$.ajax({
				url: url,
				method: "GET"
			}).done(function(data){
				$("#images-div").empty();
				for (var i = 0; i < 10; i++) {
					var image = $('<img>');
					image.attr("src", data.data[i].images.fixed_height_still.url);
					image.attr("data-pause", data.data[i].images.fixed_height_still.url);
					image.attr("data-animate", data.data[i].images.fixed_height.url);
					image.attr("data-state", "pause");
					image.addClass("gif");

					var imageContainer = $('<div>');
					imageContainer.html(image);

					var imageRating = "Rating: " + data.data[i].rating;
					var ratingContainer  = $('<div>');
					ratingContainer.html(imageRating);
					ratingContainer.addClass("ratings");

					var imageHTML = $('<div>');
					imageHTML.addClass("fl-l");
					imageHTML.html(imageContainer).append(ratingContainer);
					$("#images-div").append(imageHTML);
				};
			});

	};

	function clickImage() {
		$("#images-div").on("click", "img.gif", function() {
			
			var state = $(this).attr("data-state");
			console.log(state);

			if (state === "pause") {
				$(this).attr("src", $(this).attr("data-animate"));
				$(this).attr("data-state", "animate")
			}
			else {
				$(this).attr("src", $(this).attr("data-pause"));
				$(this).attr("data-state", "pause");
			};
		});
	};

	function buttonClick() {
		$("#buttons-div").on("click", "button.topic-button", function(event) {
			event.preventDefault();
			var value = $(this).val();
			console.log(value);
			displayImages(value);
		});
	}

      $("#add-topic").on("click", function(event) {
        event.preventDefault();

// this takes the input from whatever the user types in
        var newTopic = $("#topic-input").val().trim();

// this adds what the user input to the categories array
        categories.push(newTopic);
        console.log(newTopic)

// this displays the user's input as a button on the screen
        displayButtons();
      
      });
	

	 