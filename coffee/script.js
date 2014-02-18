var map;
var geocoder;

function MapInitialiser() {
	
	var content = document.getElementById('content');
	content.style.display = 'none';
	
	var latlng = new google.maps.LatLng(48.858859, 2.34706);
	var options = {center: latlng, zoom: 13, mapTypeId: google.maps.MapTypeId.ROADMAP };
	map = new google.maps.Map(document.getElementById("map"), options);

	var reader = new FileReader();
	var fileInput = document.querySelector('#file');
	var data;
	fileInput.onchange = function() {
	    var reader = new FileReader();
	    reader.onload = function() {
	    	data = CSVToArray(reader.result, ';');
		    console.log(data[1][2]);
		    for(var i=1; i<data.length; i++){
		    	if(data[i][2] != ''){
			   		geocodeAndLocate(data[i][2], data[i][1]);
			   		sleep(200);
			   		console.log(i + ' : ' + data[i][2]);
		   		}
		   	}
	    };
	    reader.readAsText(fileInput.files[0]);
	    content.style.display = 'block';
	    document.getElementsByTagName('body')[0].style.backgroundImage = 'none';
	};
}
function CSVToArray(strData, strDelimiter){
	strDelimiter = (strDelimiter || ";");
	var objPattern = new RegExp(("(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +"([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");

	var arrData = [[]];

	var arrMatches = null;

	while (arrMatches = objPattern.exec( strData )){
		var strMatchedDelimiter = arrMatches[ 1 ];
		if (
			strMatchedDelimiter.length &&
			(strMatchedDelimiter != strDelimiter)
			){
			arrData.push( [] );
		}
		if (arrMatches[ 2 ]){
			var strMatchedValue = arrMatches[ 2 ].replace(new RegExp( "\"\"", "g" ), "\"");
		} else {
			var strMatchedValue = arrMatches[ 3 ];
		}
		arrData[ arrData.length - 1 ].push( strMatchedValue );
	}
	return(arrData);
}
function geocodeAndLocate(address, name){
	geocoder = new google.maps.Geocoder();
	geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            title: name
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
  function sleep(miliseconds) {
       var currentTime = new Date().getTime();
       while (currentTime + miliseconds >= new Date().getTime()) {
       }
   }
