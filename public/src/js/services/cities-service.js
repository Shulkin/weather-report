angular.module("cities.service", [])
.factory("Cities", [function() {
  // === Public ===
  return {
    data: [
      {name: "Vladivostok"},
      {name: "Russkiy"},
      {name: "Artem"},
      {name: "Barabash"},
      {name: "Slavyanka"},
      {name: "Fokino"},
      {name: "Nakhodka"},
      {name: "Partizansk"},
      {name: "Ussuriysk"},
      {name: "Arsenyev"}
    ];
  };
}]);
