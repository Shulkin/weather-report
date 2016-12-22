angular.module("weather.data.service", [])
/*
.value("WEATHER_CONDITION_CODES", [
  // group codes [from, to]
  {group: [200, 232], icon: "11"}, // thunderstorm
  {group: [300, 321], icon: "09"}, // drizzle
  {group: [500, 504], icon: "10"}, // light rain
  {group: [511], icon: "13"}, // freezing rain
  {group: [520, 531], icon: "09"}, // shower rain
  {group: [600, 622], icon: "13"}, // snow
  {group: [701, 781], icon: "50"}, // atmosphere
  {group: [800], icon: "01"}, // clear
  {group: [801], icon: "02"}, // few clouds
  {group: [802], icon: "03"}, // scattered clouds
  {group: [803, 804], icon: "04"}, // overcast clouds
  {group: [900, 906], icon: ""}, // extreme
  {group: [951, 962], icon: ""} // additional
])
*/
.factory("WeatherData", ["OWM_API_KEY", "$http",
  function(OWM_API_KEY, $http) {
  // === Private ===
  var url = "http://api.openweathermap.org/data/2.5/";
  // var icon_url = "http://openweathermap.org/img/w/";
  // Examples
  // Get 5d/3h forecast in single city, by city name, in JSON
  // http://api.openweathermap.org/data/2.5/forecast?q=London,us&mode=json&appid=1ba7401f0fd8de8800f868d0400afc44
  // Get 5d/3h forecast in single city, by id, in JSON
  // http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=1ba7401f0fd8de8800f868d0400afc44
  // Get current weather in single city, by id, in JSON
  // http://api.openweathermap.org/data/2.5/weather?id=2172797&appid=1ba7401f0fd8de8800f868d0400afc44
  // Get current weather in many cities, by id, in JSON (max 20 cities)
  // http://api.openweathermap.org/data/2.5/group?id=524901,703448,2643743&units=metric&appid=1ba7401f0fd8de8800f868d0400afc44
  // Get current weather in all cities within bounding box, in JSON (max 50)
  // http://api.openweathermap.org/data/2.5/box/city?bbox=12,32,15,37,10&cluster=yes&appid=1ba7401f0fd8de8800f868d0400afc44
  // === Public ===
  return {
    getWeatherById: function(data) {
      return $http.get(url + "group?id=" + data + "&units=metric" + "&appid=" + OWM_API_KEY).then(function(response) {
        return response.data;
      });
    },
    getForecastById: function(id) {
      return $http.get(url + "weather?id=" + id + "&units=metric" + "&appid=" + OWM_API_KEY).then(function(response) {
        return response.data;
      });
    }
    /*,
    getWeatherIconByCode: function(weatherCode, day) {
      var iconCode = "01"; // clear sky by default
      // try to determine which weather icon should we use
      for (var i = 0; i < WEATHER_CONDITION_CODES.length; i++) {
        var condition = WEATHER_CONDITION_CODES[i];
        var group = condition.group;
        if (group.length < 2) { // only 1 code in range
          if (group[0] === weatherCode) {
            iconCode = condition.icon;
          }
        } else { // normal range
          if (group[0] <= weatherCode && weatherCode <= group[1]) {
            iconCode = condition.icon;
          }
        }
      }
      // just in case, icon is not provided
      if (iconCode === "") iconCode = "01";
      var dayCode = day ? "d" : "n"; // day or night?
      return icon_url + iconCode + dayCode + ".png";
    }
    */
  };
}]);
