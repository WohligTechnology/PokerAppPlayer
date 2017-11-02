myApp = angular.module('starter');

myApp.service("selectPlayer", function () {
  this.currentPlayer = $.jStorage.get("player");
  this.setPlayer = function (playerId) {
    $.jStorage.set("player", playerId);
    this.currentPlayer = playerId;
  };
  this.getPlayer = function () {
    return this.currentPlayer;
  };
});
myApp.factory('apiService', function ($http, $q, $timeout) {
  var adminurl = 'http://localhost:8081/api/';
  return {
    // This is a demo Service for POST Method.
    callApiWithData: function (url, data, callback) {
      $http.post(adminurl + url, data).then(function (data) {
        callback(data);
      });
    },
    showWinner: function (callback) {
      $http.post(adminurl + 'Player/showWinner').then(function (data) {
        callback(data);
      });
    }
  };
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
      function calc() {
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
        } else if ($scope.card == "NONE" || $scope.card == "") {
          $scope.cardImg = Poker.getBackData(1024, '#535550', '#535550');
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
      calc();
      $scope.$watch("card", function () {
        calc();
      });


    }
  };
});

myApp.directive('community', function () {
  return {
    restrict: 'E',
    replace: false,
    scope: {
      communityCard: "=ngCommunityCard"
    },
    templateUrl: '/templates/directive/communityCard.html',
    link: function ($scope, element, attr) {

    }
  };
})

myApp.directive('winnerPlayer', function () {
  return {
    restrict: 'E',
    replace: false,
    scope: {
      player: "=ngPlayer",
      method: "="
    },
    templateUrl: '/templates/directive/winnerPlayer.html',
    link: function ($scope, element, attr) {}
  };
})

myApp.directive('player', function () {
  return {
    restrict: 'E',
    replace: false,
    scope: {
      player: "=ngPlayer"
    },
    templateUrl: '/templates/directive/player.html',
    link: function ($scope, element, attr) {}
  };
})