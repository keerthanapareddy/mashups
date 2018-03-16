var app = {
  location:{},
	social_score:{},
	supported_market:{},

  initialize: function() {
		app.getspatialAIData();
	},

	makeHTML: function() {
		var theHTML = '';
		// for (var i = 0; i < app.social_score.quarters.length; i++){
				for (var j = 0; j < app.social_score.quarters[6].scores.length; j++){
      theHTML += "<div class='spatialAI'>";
			theHTML += "<h3>" + app.social_score.quarters[6].scores[j].category_name+ "</h3>";
			// theHTML += "<h3>" + app.location + "</h3>";

			theHTML += "</div>";
		}
  // }

		$('main').html(theHTML);
	},



   getspatialAIData: function() {
		console.log("Get spatial Data");
    var latitude = $("#latitude").val();
    console.log(latitude);
    var longitude = $("#longitude").val();
    console.log(longitude);
		// var currentSearchWord = 'lat=39.106395&lng=-84.515844';
		// var spatialURL = 'https://api.spatial.ai/neighborhood/point/social_score?' + currentSearchWord + '&apikey=';
    var spatialURL = 'https://api.spatial.ai/neighborhood/point/social_score?' + 'lat=' + latitude + '&lng=' + longitude +'&apikey=';
		var spatialKey = 'H8ylnFsByJB6iH3w8lnrJsmk2DPPGOqi';
		var spatialReqURL = spatialURL + spatialKey;
		console.log(spatialReqURL);

		$.ajax({
			url: spatialReqURL,
		  type: 'GET',
			dataType: 'json',
      success: function(data){
        console.log("success");
				// debugger();
				//console.log(data);
				//app.social_score = data.social_score;
				//console.log(app.social_score);
				// console.log(data.respose.);
				//app.makeHTML();
			},
			error: function(err){
				console.log("Uh oh...");
				console.log(err);
			}

		});
    console.log(spatialReqURL);
	}



};
