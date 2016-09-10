angular.module('starter.controllers', ['google-maps'])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats, $timeout) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});


  $scope.misMensajes = [];
  
  var VariableFireBase = new Firebase('https://proyecto1-3ddb9.firebaseio.com/usuarios/');
   VariableFireBase.on('child_added', function (snapshot) {
      $timeout(function(){
        var message = snapshot.val();
        $scope.misMensajes.push(message);
        console.log($scope.misMensajes);
      });
   });

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('CountriesCtrl', function($scope, $http, $state) {
  $scope.paises = [];

  $http.get("https://restcountries.eu/rest/v1/region/americas") 
    .then(function(respuesta){
      console.info("Volvio: ", respuesta.data);
      $scope.paises = respuesta.data;
    }, 
    function(error){
      console.info("Error: ", error);
      $scope.paises = [];
  });

  $scope.enviar = function(pais){
    var paisParam = JSON.stringify(pais);
    $state.go("tab.country-detail", {nombrePais:paisParam});
  }
 //NOMBRE del estado
})

.controller('CountryDetailCtrl', function($scope, $stateParams, $state) {
  $scope.pais = JSON.parse($stateParams.nombrePais);
  
  $scope.map = {
    center: {
      latitude: $scope.pais.latlng[0], 
      longitude: $scope.pais.latlng[1]
    }, 
    zoom: 4,
    options : {
      scrollwheel: false
    },
    control: {}
  };
  $scope.marker = {
    id: 0,
    coords: {
      latitude: 40.454018,
      longitude: -3.509205
    },
    options: {
      draggable: true
    }
  };

  $scope.goBack = function(){
    $state.go("tab.countries");
  }
});
