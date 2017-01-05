var APPID = "84dfca470cbcdc21c60246631651f3eb";
var temp;
var icon;
var humidity;
var wind;
var direction;
var iconId;
var myVar = setInterval(dateAndTime, 1000);

window.onload = function () {
    temp = document.getElementById("temperature");
    humidity = document.getElementById("humidity");
    description = document.getElementById("description");

	updateByZip("newdelhi");
    /* NEW 
    if(navigator.geolocation){
	var showPosition = function(position){
	    updateByGeo(position.coords.latitude, position.coords.longitude);
	} 
	// navigator.geolocation.getCurrentPosition(showPosition);
	// } else {
	// var zip = window.prompt("Could not discover your location. What is your zip code?");
	// updateByZip(zip);
	// } */
}

/* NEW

function updateByGeo(lat, lon){
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
	"lat=" + lat +
	"&lon=" + lon +
	"&APPID=" + APPID;
    sendRequest(url);    
} */


function updateByZip(zip){
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
	"q=" + zip +
	"&APPID=" + APPID;
    sendRequest(url);
}


function sendRequest(url){
    var xmlhttp = new XMLHttpRequest();
   xmlhttp.open("GET", url, true);
  console.log(url+xmlhttp);
   console.log(xmlhttp.status == 200);
    xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);
    // console.log(data);
	    var weather = {};
	    weather.code = data.weather[0].id;
	    weather.humidity = data.main.humidity;
	    // weather.wind = Math.round(data.wind.speed);
	    /* NEW */
	    weather.description = data.weather[0].description;
	    weather.temp = K2C(data.main.temp);	
		weather.iconId = data.weather[0].id;
		console.log(weather.iconId);
	    update(weather);
	}else{
		var weather = {};
		 weather.temp = 25;
		 weather.humidity = "undefined";
		 weather.description = "Data Unavailable. Connection Failure !!"
		 weather.iconId = "800";
		 update(weather);
    console.log("Error");
  }
    };
    xmlhttp.send();
}

function update(weather) {
    humidity.innerHTML = weather.humidity;
    temp.innerHTML = weather.temp;
		description.innerHTML = weather.description;
  console.log(weather.temp+"temp");
	showHideIcon(weather.iconId)
}

function K2F(k){
    return Math.round(k*(9/5)-459.67);
}

function K2C(k){
    return Math.round(k - 273.15);
}

function dateAndTime() {
	var dayOptions = { weekday: 'long'};
	var dateOptions = {year: 'numeric', month: 'long', day: 'numeric' };
    var d = new Date();
	document.getElementById("clock").innerHTML = d.toLocaleTimeString();
	document.getElementById("date").innerHTML = d.toLocaleDateString("en-US",dateOptions);
	document.getElementById("day").innerHTML = d.toLocaleDateString("en-US",dayOptions);
}

function showHideIcon(iconId){
	var elements = hide(document.querySelectorAll('.icon'));	
	//console.log("elementsLength:"+elements.length);
	console.log("2"+iconId);
	showIcon(iconId);
}

function hide (elements) {
  elements = elements.length ? elements : [elements];
  for (var index = 0; index < elements.length; index++) {
    elements[index].style.display = 'none';
  }
}
function showIcon (iconId) {
	var currentD = new Date();
	console.log("Hours "+currentD.getHours())
	if(iconId>=200 && iconId<300){
		show(document.getElementById('thunder-storm'));
	}else if(iconId>=300 && iconId<400){
		show(document.getElementById('sun-shower'));
	} else if(iconId>=500 && iconId<600){
			show(document.getElementById('rainy'));			
	}else if(iconId>=600 && iconId<700){
				show(document.getElementById('flurries'));		
	}else if(iconId>=700 && iconId<800){
				show(document.getElementById('cloudy'));		
	}else if(iconId==800){
		if(currentD.getHours()<5 || currentD.getHours()>=19){
			show(document.getElementById('moony'));	
		}else{
			show(document.getElementById('sunny'));	
		}	
	}else if(iconId>=801 && iconId<900){
				show(document.getElementById('cloudy'));		
	}else if(iconId>=900 && iconId<910){
				show(document.getElementById('thunder-storm'));		
	}else if(iconId>=910 && iconId<999){
				show(document.getElementById('cloudy'));		
	}else{
		if(currentD.getHours()<5 || currentD.getHours()>19){
			show(document.getElementById('moony'));	
		}else{
			show(document.getElementById('sunny'));	
		}
	}
}
function show (elements) {
	console.log("Showing"+elements);
	elements.style.display = 'inline-block';
  // elements = elements.length ? elements : [elements];
  // for (var index = 0; index < elements.length; index++) {
    // elements[index].style.display = 'block';
  // }
}
