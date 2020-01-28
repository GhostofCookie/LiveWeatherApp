var xmlhttp;
var weatherURL;

var loc = "lethbridge,ca"; // option to change location 
var showIcon = true; // change to false if you want to use your own icon

window.onload = function () {  
    weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + loc + "&units=metric&APPID=ac4442d3cc94f73f2a14aabd2a07da36";
    weather();
}

function weather() {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', weatherURL, true); //this changes the state of xmlhttp
    xmlhttp.send();
    xmlhttp.onreadystatechange = getWeather;
}

function getWeather() { // when readystate changes
        
    //check to see if the client -4 and server -200 is ready
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

        var json = JSON.parse(xmlhttp.responseText);

        function Forcast(Temp, Descrip, Icon, Wind, Max, Min, Humid) {          
            document.getElementById("temp").innerHTML = Math.round(Temp);
            document.getElementById("description").innerHTML = Descrip;
            document.getElementById("mintemp").innerHTML = Min;
            document.getElementById("maxtemp").innerHTML = Max;
            document.getElementById("wind").innerHTML = Wind;
            document.getElementById("humidity").innerHTML = Humid;
            if(showIcon){document.getElementById("icon").src = "http://openweathermap.org/img/wn/" + Icon + "@2x.png";}
        }

        var current = new Forcast(json.main.temp, json.weather[0].description, json.weather[0].icon, json.wind.speed, json.main.temp_max, json.main.temp_min, json.main.humidity );

        console.log("all info received from server");

    } else {
        console.log("no dice");
    }
}
