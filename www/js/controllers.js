var playerCtrlSocket = {};
var winnerCtrlSocket = {};

angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {})

  .controller('PlayerCtrl', function ($scope, $stateParams, selectPlayer, apiService, $interval, $state) {

    io.socket.off("Update", winnerCtrlSocket.update);

    playerCtrlSocket.update = function (data) {
      compileData(data);
      $scope.$apply();
    };
    io.socket.on("Update", playerCtrlSocket.update);

    $scope.getTabDetail = function () {
      apiService.getAll(compileData);
    };
    $scope.getTabDetail();


    function compileData(data) {
      $scope.player = _.find(data.playerCards, function (player) {
        return player.playerNo == selectPlayer.getPlayer();
      });
      $scope.communityCards = data.communityCards;
      $scope.remainingPlayer = _.filter(data.playerCards, function (player) {
        return player.isActive && !player.isFold;
      }).length;
      if (!$scope.player) {
        $state.go("tab");
      }
      if (data.isCheck) {
        $scope.isCheck = true;
      } else {
        $scope.isCheck = false;
      }
    }

    $scope.raise = function () {
      $scope.player.isTurn = false;
      apiService.raise(function (data) {});
    };
    $scope.allIn = function () {
      $scope.player.isTurn = false;
      apiService.allIn(function (data) {});
    };
    $scope.call = function () {
      $scope.player.isTurn = false;
      apiService.moveTurn(function (data) {});
    };
    $scope.check = function () {
      $scope.player.isTurn = false;
      apiService.moveTurn(function (data) {});
    };
    $scope.fold = function () {
      $scope.player.isTurn = false;
      apiService.fold(function (data) {});
    };

  })
  .controller('TabCtrl', function ($scope, $stateParams, selectPlayer, $state) {
    $scope.players = ["1", "2", "3", "4", "5", "6", "7", "8"];
    $scope.currentPlayer = selectPlayer.getPlayer();
    $scope.selectPlayerNo = function (currentPlayer) {
      selectPlayer.setPlayer(currentPlayer);
    };
  })
  .controller('PlaylistCtrl', function ($scope, $stateParams) {});