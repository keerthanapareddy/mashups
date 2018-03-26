var app = {
  location:{},
	social_score:{},
	supported_market:{},

  initialize: function() {
     $('#searchlocation').submit(function(e){
      e.preventDefault();
      console.log("Yahaan!");
      // app.geocodeAddress(geocoder, map);
      // app.getspatialAIData(location);
      e.preventDefault();
  });
	},

	makeHTML: function() {
		var theHTML = '';
		// for (var i = 0; i < app.social_score.quarters.length; i++){
			for (var j = 0; j < app.social_score[6].scores.length; j++){
      theHTML += "<div class='spatialAI'>";
			theHTML += "<h3>" + app.social_score[6].scores[j].category_name + "</h3>";
      	// theHTML += "<h3>" + app.location.lat + "</h3>";
        // theHTML += "<h3>" + app.location.lng + "</h3>";
      // theHTML += "<h3>" + app.social_score.quarters[6].scores[j].category_name+ "</h3>";
			// theHTML += "<h3>" + app.location + "</h3>";

			theHTML += "</div>";
		}
  // }
     $('main').html(theHTML);
  },



   getspatialAIData: function(location) {
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
        app.social_score = data.social_score.quarters;
        // for (var i = 0; i < app.social_score.length; i++){
				// 	app. getspatialAIData(app.social_score[i]);
				// }
        console.log(app.social_score);

        app.makeHTML();
      }
    });
  });
    // console.log(spatialReqURL);
	},

  //google maps
   initMap: function() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: {lat: -34.397, lng: 150.644}
    });
    var geocoder = new google.maps.Geocoder();

    // document.getElementById('submit').addEventListener('click', function() {

    // });
  },

 geocodeAddress: function(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
};
