$(document).ready(function(){
  var crd;
  navigator.geolocation.getCurrentPosition(function(pos){
    crd = pos.coords; 
    var posObj = {lat: crd.latitude, lng: crd.longitude };
    console.log(posObj);
    getPlace(posObj);
    getWeather(posObj);
    initMap(posObj);
  });

  
});

function getPlace(posObj){
  var urlString = "http://maps.googleapis.com/maps/api/geocode/json?latlng="+ posObj.lat +","+ posObj.lng +"&sensor=true";
  
  $.getJSON(urlString, function(data){
    //console.log(data);
    //$("#place").html(''+data.results[0].formatted_address);

  });

}

function getWeather(posObj){
  // Weather API: b6c3b747a17cfeecf07142d8596a2d04
  //key for API
  var key = "b6c3b747a17cfeecf07142d8596a2d04";
  var urlString = "http://api.openweathermap.org/data/2.5/weather?lat="+ posObj.lat + "&lon="+posObj.lng+"&APPID="+key;
  
  $.ajax({
    url: urlString,
    dataType: 'json',
    success: function(data){
      //console.log(data);
      $("#place").html(''+data.name);
      $("#country").html(''+data.sys.country);
      
      $("#speed").html(''+data.wind.speed);
      $("#degree").html(''+data.wind.deg);

      $(".description").html(''+data.weather[0].description);
      $("#temp").html(''+ convertToCelsius(data.main.temp) +' °C');
      $(".min").html(''+ convertToCelsius(data.main.temp_min) +' °C');
      $(".max").html(''+ convertToCelsius(data.main.temp_max) +' °C');

      IconGen(data.weather[0].main);

    }
  });
}

function convertToCelsius(temp){
  temp -= 273,15;
  temp = Math.floor(temp);
  return temp;
}

function initMap(posObj) {
  var uluru = posObj;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: uluru,
    disableDefaultUI: true
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}

function IconGen(desc) {
  var desc = desc.toLowerCase()
  switch (desc) {
    case 'drizzle':
      addIcon(desc)
      break;
    case 'clouds':
      addIcon(desc)
      break;
    case 'rain':
      addIcon(desc)
      break;
    case 'snow':
      addIcon(desc)
      break;
    case 'clear':
      addIcon(desc)
      break;
    case 'thunderstom':
      addIcon(desc)
      break;
    default:
      $('div.clouds').removeClass('hide');
  }
}

function addIcon(desc) {
  $('div.' + desc).removeClass('hide');
}