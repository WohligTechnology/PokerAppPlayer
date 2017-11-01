myApp = angular.module('starter');

myApp.service("selectPlayer", function(){
    this.currentPlayer = '';
    this.setPlayer = function(playerId){
      this.currentPlayer = playerId;
    }
    this.getPlayer = function(){
      return this.currentPlayer;
    }
})
myApp.factory('apiService', function ($http, $q, $timeout) {
    var adminurl = 'http://localhost:8081/api/'
    return {

        // This is a demo Service for POST Method.
        callApiWithData: function (url, data, callback) {
            console.log("inside apiService");
            $http.post(adminurl + url, data).then(function (data) {
                callback(data);
            });
        }
    }

 
});

myApp.directive('card', function () {
    return {
      restrict: 'E',
      replace: false,
      scope: {
        card: "@",
        width: "@",
        height: "@"
      },
      templateUrl: '/templates/directive/card.html',
      link: function ($scope, element, attr) {
        console.log("the length is: " + $scope.card);
        if ($scope.card.length == 2) {
          
          $scope.cardColor = $scope.card[1];
          $scope.cardNo = $scope.card[0];
          if ($scope.card[0] == "T") {
            $scope.cardNo = "10";
          } else if ($scope.card[0] == "1") {
            $scope.cardNo = "A";
          }
          $scope.cardImg = Poker.getCardData(1024, $scope.cardColor, $scope.cardNo);
          $scope.style = {
            width: $scope.width + "px",
            height: $scope.height + "px"
          };
        } else {
          $scope.cardImg = Poker.getBackData(1024, '#58AAAF', '#1F7A80');
          $scope.style = {
            width: $scope.width + "px",
            height: $scope.height + "px"
          };
        }
        $scope.$watch(function(scope) { return scope.card },
        function() {
          if ($scope.card.length == 2) {
            
            $scope.cardColor = $scope.card[1];
            $scope.cardNo = $scope.card[0];
            if ($scope.card[0] == "T") {
              $scope.cardNo = "10";
            } else if ($scope.card[0] == "1") {
              $scope.cardNo = "A";
            }
            $scope.cardImg = Poker.getCardData(1024, $scope.cardColor, $scope.cardNo);
            $scope.style = {
              width: $scope.width + "px",
              height: $scope.height + "px"
            };
          } else {
            $scope.cardImg = Poker.getBackData(1024, '#58AAAF', '#1F7A80');
            $scope.style = {
              width: $scope.width + "px",
              height: $scope.height + "px"
            };
          } 
        }
       );


      }
    };
  });