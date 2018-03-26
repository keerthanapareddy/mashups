var app = {
  location:{},
	social_score:{},
	supported_market:{},

  initialize: function() {
     $('#fields').submit(function(e){
      e.preventDefault();
      console.log("Yahaan!");
      app.getspatialAIData(location);
      e.preventDefault();
  });
	},

	makeHTML: function(thething) {
		var theHTML = '';
		// for (var i = 0; i < app.social_score.quarters.length; i++){
			// for (var j = 0; j < app.social_score.quarters.length; j++){
      theHTML += "<div class='spatialAI'>";
			// theHTML += "<h3>" + app.social_score.quarters[6] + "</h3>";
      	theHTML += "<h3>" + app.location + "</h3>";
      // theHTML += "<h3>" + app.social_score.quarters[6].scores[j].category_name+ "</h3>";
			// theHTML += "<h3>" + app.location + "</h3>";

			theHTML += "</div>";
		// }
  // }
     $('main').html(theHTML);

	},



   getspatialAIData: function(thething) {
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

    $(document).ready(function() {
     console.log("document 2 ready");
		//ajax call here
    $.ajax({
      url: spatialReqURL,
      type: 'GET',
      dataType: 'json',


      check: console.log("ajax call"),
      error: function(err){
        console.log("Uh oh...");
        console.log(err);
      },

      success: function(data){
        console.log("success");
        console.log(data);
        app.location = data.location;
        console.log(app.location);
        app.makeHTML(app.location);
      }
    });
  });
    // console.log(spatialReqURL);
	}
};
