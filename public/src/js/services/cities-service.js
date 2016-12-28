angular.module("cities.service", [])
.factory("Cities", [function() {
  // === Public ===
  return {
    all: function() {
      return [
        {id: "2013348", name: "Vladivostok"}/*,
        {id: "2017364", name: "Russkiy"},
        {id: "2027142", name: "Barabash"},
        {id: "2016430", name: "Slavyanka"},
        {id: "2015310", name: "Fokino"},
        {id: "2019528", name: "Nakhodka"},
        {id: "2018116", name: "Partizansk"},
        {id: "2014006", name: "Ussuriysk"},
        {id: "2027468", name: "Arsenyev"}*/
      ];
    },
    // extract ids from array of cities
    getIds: function(data) {
      var result = [];
      for (var i = 0; i < data.length; i++) {
        result.push(data[i].id);
      }
      return result;
    }
  };
}]);
