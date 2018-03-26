var app = {
  location:{},
  latitude:{},
  longitude:{},
	social_score:{},


  initialize: function() {
     $('#searchlocation').submit(function(e){
      e.preventDefault();
      console.log("Yahaan!");
      app.initMap();
      app.getGoogleMapAPI(location);


      e.preventDefault();
  });
	},

	makeHTML: function() {
		var theHTML = '';
		// for (var i = 0; i < app.social_score.quarters.length; i++){
			for (var j = 0; j < app.social_score[7].scores.length; j++){
      theHTML += "<div id='apiresults'>";
			theHTML += "<p>" + app.social_score[7].scores[j].category_name + "<p>";
      theHTML += "<p>" + app.social_score[7].scores[j].value + "<p>";



      	// theHTML += "<h3>" + app.location.lat + "</h3>";
        // theHTML += "<h3>" + app.location.lng + "</h3>";
      // theHTML += "<h3>" + app.social_score.quarters[6].scores[j].category_name+ "</h3>";
			// theHTML += "<h3>" + app.location + "</h3>";

			theHTML += "</div>";
		}
  // }
     $('#apiresults').html(theHTML);
  },



   getspatialAIData: function(location) {
		console.log("Get spatial Data");
    var spatialLatitude = app.latitude;
    console.log(spatialLatitude);
    var spatialLongitude = app.longitude;
    console.log(spatialLongitude);
		// var currentSearchWord = 'lat=39.106395&lng=-84.515844';
		// var spatialURL = 'https://api.spatial.ai/neighborhood/point/social_score?' + currentSearchWord + '&apikey=';
    var spatialURL = 'https://api.spatial.ai/neighborhood/point/social_score?' + 'lat=' + spatialLatitude + '&lng=' + spatialLongitude +'&apikey=';
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
    app.geocodeAddress(geocoder, map);
    // });
  },

 geocodeAddress: function(geocoder, resultsMap) {
    // var address = document.getElementById('address').value;
    var address = $("#address").val();
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
  },

  getGoogleMapAPI : function(location){
    console.log("Get Google location");
    var address = $("#address").val();
    var mapURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address +'&key=';
		var mapKey = 'AIzaSyDPWS54PNjzC-65SUDM5GsWOmdPKjy2nis';
		var mapReqURL = mapURL + mapKey;
		console.log(mapReqURL);

    $(document).ready(function() {
     console.log("document 2 ready");
    //ajax call here
    $.ajax({
      url: mapReqURL,
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
        app.latitude = data.results[0].geometry.location.lat;
        app.longitude = data.results[0].geometry.location.lng;
        // // for (var i = 0; i < app.social_score.length; i++){
        // // 	app. getspatialAIData(app.social_score[i]);
        // // }
        console.log(app.latitude);
        console.log(app.longitude);
        console.log("getting spatial now");
        app.getspatialAIData(location);
        // app.makeHTML();
      }
    });
  });

  }
};

function myFunction() {
    var points = [40, 100, 1, 5, 25, 10];
    points.sort(function(a, b){return b-a});
    console.log(points[0]);
}
