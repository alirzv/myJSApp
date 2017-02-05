var APPID = "84dfca470cbcdc21c60246631651f3eb";
var temp;
var icon;
var humidity;
var wind;
var direction;
var iconId;
var myVar = setInterval(dateAndTime, 1000);
var date = new Date();

window.onload = function () {
    temp = document.getElementById("temperature");
    humidity = document.getElementById("humidity");
    description = document.getElementById("description");
	updateByName("newdelhi");
	displayPrayerTimes();
	//findFile();
   }

function updateByName(zip){
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
	"q=" + zip +
	"&APPID=" + APPID;
	var handleWeatherApiResponse = function(response) {
		
	};
    sendRequest(url);
}


function sendRequest(url){
    var xmlhttp = new XMLHttpRequest();
   xmlhttp.open("GET", url, true);
   console.log(url+xmlhttp);
    xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var data = JSON.parse(xmlhttp.responseText);
	    var weather = {};
	    weather.code = data.weather[0].id;
	    weather.humidity = data.main.humidity;
	    weather.description = data.weather[0].description;
	    weather.temp = K2C(data.main.temp);	
		weather.iconId = data.weather[0].id;
		//console.log(weather.iconId);
	    update(weather);
	}else{
		var weather = {};
		 weather.temp = 25;
		 weather.humidity = "undefined";
		 weather.description = "Data Unavailable. Connection Failure !!"
		 weather.iconId = "800";
		 update(weather);
		console.log("Showing default weather data");
  }
    };
    xmlhttp.send();
}

function update(weather) {
    humidity.innerHTML = weather.humidity;
    temp.innerHTML = weather.temp;
		description.innerHTML = weather.description;
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
	//console.log("Hours "+currentD.getHours())
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
}

function displayPrayerTimes(){
	var storage = window.localStorage;
	var handleApiResponse = function(response) {
		var today = date.toLocaleDateString("en-US",{day: 'numeric'});
		// Parse JSON string into object
		//var prayerData = JSON.parse(response);
		storage.setItem("storedPrayerJSON", response);
		console.log("Added data to cache:"+response);
		displayPrayerData(response);
		};
	var currentMonth = date.toLocaleDateString("en-US",{month: 'short'});
	if(storage.getItem("storedPrayerJSON") && storage.getItem("storedPrayerJSON").includes(currentMonth)){
		console.log("Found data in cache"+storage.getItem("storedPrayerJSON"));
		displayPrayerData(storage.getItem("storedPrayerJSON"));
		//storage.removeItem(key);
	}else{
		callPrayerApi(handleApiResponse);
	}
}

function displayPrayerData(prayerJsonString){
	var today = date.toLocaleDateString("en-US",{day: 'numeric'});
	var dataObj = JSON.parse(prayerJsonString);
	console.log("Fajr to display"+dataObj.data[today-1].timings.Fajr);
	document.getElementById("sunrise").innerHTML = dataObj.data[today-1].timings.Sunrise.replace("(IST)",'');
	document.getElementById("zuhr").innerHTML = dataObj.data[today-1].timings.Dhuhr.replace("(IST)",'');
	document.getElementById("asr").innerHTML = dataObj.data[today-1].timings.Asr.replace("(IST)",'');
	document.getElementById("maghrib").innerHTML = dataObj.data[today-1].timings.Maghrib.replace("(IST)",'');
	document.getElementById("isha").innerHTML = dataObj.data[today-1].timings.Isha.replace("(IST)",'');
}
// function findFile(){
	// var month = date.toLocaleDateString("en-US",{month: 'long'});
	// var fileName = month+".json";
	// window.resolveLocalFileSystemURL(cordova.file.applicationDirectory, function (dirEntry) {
    // console.log('file system open: ' + dirEntry.name);
	// }, onErrorLoadFs);	
// }

 function callPrayerApi(callback) { 
		var month = date.toLocaleDateString("en-US",{month: '2-digit'});
		var year = date.toLocaleDateString("en-US",{year: 'numeric'});
		var apiUrl = "http://api.aladhan.com/calendarByCity?city=newDelhi&country=IN&month="+month+"&year="+year+"&method=1&school=1";
		console.log(apiUrl);
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", apiUrl, true);
		console.log(xmlhttp.status == 200);
		xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			   callback(xmlhttp.responseText);
			   //var weather = {};
			 }
		};
    xmlhttp.send();
 }
 
 var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};