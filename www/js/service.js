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


  return {
    // This is a demo Service for POST Method.
    callApiWithData: function (url, data, callback) {
      $http.post(adminurl + url, data).then(function (data) {
        callback(data);
      });
    },
    getAll: function (callback) {
      $http.post(adminurl + 'Player/getAll').then(function (data) {
        callback(data.data.data);
      });
    },
    showWinner: function (callback) {
      $http.post(adminurl + 'Player/showWinner').then(function (data) {
        callback(data);
      });

    },
    moveTurn: function (callback) {
      $http.post(adminurl + 'Player/moveTurn').then(function (data) {
        callback(data);
      });

    },
    fold: function (callback) {
      $http.post(adminurl + 'Player/fold').then(function (data) {
        callback(data);
      });
    },
    allIn: function (callback) {
      $http.post(adminurl + 'Player/allIn').then(function (data) {
        callback(data);
      });
    },
    raise: function (callback) {
      $http.post(adminurl + 'Player/raise').then(function (data) {
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
    templateUrl: 'templates/directive/card.html',
    link: function ($scope, element, attr) {
      function calc() {
        $scope.style = {
          width: $scope.width + "px",
          height: $scope.height + "px"
        };
        $scope.cardFile = "img/cards/" + _.toUpper($scope.card) + ".svg";
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
    templateUrl: 'templates/directive/communityCard.html',
    link: function ($scope, element, attr) {

    }
  };
});

myApp.directive('winnerPlayer', function () {
  return {
    restrict: 'E',
    replace: false,
    scope: {
      player: "=ngPlayer",
      method: "="
    },
    templateUrl: 'templates/directive/winnerPlayer.html',
    link: function ($scope, element, attr) {}
  };
});

myApp.directive('player', function ($ionicGesture) {
  return {
    restrict: 'E',
    replace: false,
    scope: {
      player: "=ngPlayer"
    },
    templateUrl: 'templates/directive/player.html',
    link: function ($scope, $element, attr) {
      var cardHeight = 300;
      var topMargin = 50;
      var maxDragPercent = 60;
      $scope.dragCss = {
        width: "100%",
        overflow: "hidden",

      };
      $scope.dragCssOpen = {
        width: "100%",
        overflow: "hidden",
        height: "0px"
      };
      this.onDrag = function (event) {
        var upDistance = event.gesture.distance;
        var amountUp = (cardHeight - upDistance);
        var dragPercent = upDistance / cardHeight * 100;
        if (dragPercent < maxDragPercent) {
          var topPosition = (cardHeight - (2 * upDistance));
          $scope.dragCss.height = amountUp + "px";
          $scope.dragCssOpen.height = upDistance + "px";
          $scope.dragCssOpen.top = (topPosition + topMargin) + "px";
          $scope.$apply();
        }
      };

      this.onDragEnd = function (event) {
        $scope.dragCss.height = cardHeight + "px";
        $scope.dragCssOpen.height = "0px";
        $scope.dragCssOpen.top = cardHeight + topMargin + "px";
        $scope.$apply();
      };

      $ionicGesture.on('dragup', this.onDrag, $element);
      $ionicGesture.on('dragend', this.onDragEnd, $element);

    }
  };
});