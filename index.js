const SearchText = document.getElementById("CitySearch");
const SearchButton = document.getElementById("SButt");

let cityname = "";
const APIkey = "1e11ca6dbba6d1d3a866176d2ab0d578";

let CityWeatherObject = {};



SearchButton.addEventListener("click", function() {
      cityname = SearchText.value.trim();

      if (cityname.length === 0) {
            alert("City not found. Please enter a valid city name!");
            return;
        }
      else {
            GetLongLAtt(cityname);
            SearchText.value = "";
      }
      
})


async function GetLongLAtt (cityName) {
      try {
            let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${APIkey}`)
            let data = await response.json();
            console.log(data);

            const {lat, lon} = data[0];
            GetWeatherData(lat, lon);
      }
      catch (err) {
            if (err instanceof TypeError) {
                  alert("Network Error! Please check your connection.");
              } else {
                  alert("Something went wrong. Please try again.");
              }
      }
}

async function GetWeatherData(lat, lon) {
      try {
            let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`)
            let data = await response.json();
            console.log(data);
            let {main, weather, wind} = data;

            console.log(main);
            console.log(weather);
            console.log(wind);

            let {humidity, temp} = main;
            let {icon, description} = weather[0];
            let {speed} = wind;

            CityWeatherObject.humidity = humidity;
            CityWeatherObject.temprature = (temp - 273.15).toFixed(1);
            CityWeatherObject.weathericon = icon;
            CityWeatherObject.Wdescription = description;
            CityWeatherObject.WindSpeed = speed;
            CityWeatherObject.CityName = cityname;
            CityWeatherObject.CurrentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            document.getElementById("cityName").innerHTML = CityWeatherObject.CityName;
            document.getElementById("cityTime").innerHTML = CityWeatherObject.CurrentTime;
            document.getElementById("temprature").innerHTML = `${CityWeatherObject.temprature}°C`;
            document.getElementById("weatherCondition").innerHTML = CityWeatherObject.Wdescription;
            document.getElementById("windSpeed").innerHTML = `${CityWeatherObject.WindSpeed}km/h`;
            document.getElementById("Humidity").innerHTML = `${CityWeatherObject.humidity}%`;
            document.getElementById("Icon").src = ` https://openweathermap.org/img/wn/${CityWeatherObject.weathericon}@2x.png`;

      }
      catch (err) {
            if (err instanceof TypeError) {
                  alert("Network Error! Please check your connection.");
              } else {
                  alert("Something went wrong. Please try again.");
              }
      }
}