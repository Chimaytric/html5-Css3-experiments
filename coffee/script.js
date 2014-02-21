var map;
var geocoder = new google.maps.Geocoder();;
var markers = new Array();
var infowindows = new Array();

function MapInitialiser() {
	var latlng = new google.maps.LatLng(48.858859, 2.34706);
	var options = {center: latlng, zoom: 13, mapTypeId: google.maps.MapTypeId.ROADMAP };
	map = new google.maps.Map(document.getElementById("map"), options);
	
	var list = document.getElementById('list');
	var element;
	var subList;
	var subListName;
	var subListAddress;
	var text;
	
	for(var i=0; i<dataLoad.length; i++){
		element = document.createElement('li');
		subList = document.createElement('ul');
		subList.setAttribute('selected', 'false');
		subList.setAttribute('class', 'subList');
		
		subListName = document.createElement('li');
		subListName.setAttribute('class', 'name');
		
		subListAddress = document.createElement('li');
		subListAddress.setAttribute('class', 'address')
		
		text = document.createTextNode(dataLoad[i][1]);
		subListName.appendChild(text);
		
		text = document.createTextNode(dataLoad[i][2]);
		subListAddress.appendChild(text);
		
		subList.appendChild(subListName);
		subList.appendChild(subListAddress);
		
		subList.addEventListener('click', function(){
			var current = document.getElementsByClassName('subList');
			for(var j = 0; j<current.length; j++){
				current[j].setAttribute('selected', 'false');
				current[j].style.backgroundColor = 'rgba(5,5,5,0)';
			}
			for(var valeurMarker in markers)
				markers[valeurMarker].setVisible(false);

			for(var valeurInfowindow in infowindows)
				infowindows[valeurInfowindow].close();

			this.setAttribute('selected', 'true');
			this.style.backgroundColor = 'rgba(5,5,5,0.3)';
			var contentString = this.getElementsByClassName('address')[0].innerHTML;
			var infowindow = createInfowindow(this.getElementsByClassName('name')[0].innerHTML, this.getElementsByClassName('address')[0].innerHTML);
			geocodeAndLocate(this.getElementsByClassName('address')[0].innerHTML, infowindow);
		}, false);
		
		element.appendChild(subList);
		list.appendChild(element);
	}
	
}
function createInfowindow(name, address){
	var contentString = '<h1>'+name+'</h1>'+'<p>'+address+'</p><a href="https://www.google.fr/maps/place/'+address+'">Open in google maps</a>';

	infowindows[address] = new google.maps.InfoWindow({
		content: contentString
	});
	return(infowindows[address]);
}
function geocodeAndLocate(address, infowindow){
    if(markers[address] == undefined){
    	geocoder.geocode( { 'address': address}, function(results, status) {
		    if (status == google.maps.GeocoderStatus.OK) {
		    	map.setCenter(results[0].geometry.location);
		    	markers[address] = new google.maps.Marker({
		    		map: map,
		            position: results[0].geometry.location,
		        });
		        google.maps.event.addListener(markers[address], 'click', function() {
    				infowindow.open(map,markers[address]);
  				});
		    } else {
		        alert("Geocode was not successful for the following reason: " + status);
		    }
		});
    } else
    	markers[address].setVisible(true);
}

function sleep(miliseconds) {
   var currentTime = new Date().getTime();
   while (currentTime + miliseconds >= new Date().getTime()) {
   }
}