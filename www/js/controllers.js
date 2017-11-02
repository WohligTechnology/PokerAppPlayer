angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {})


  .controller('WinnerCtrl', function ($scope, $stateParams, apiService, $state) {
    io.socket.on("broadcastNewGame", function (data) {
      $state.go('player');
    });

    $scope.showWinner = function () {
      apiService.showWinner(function (data) {
        $scope.winners = data.data.data.winners;
        $scope.communityCards = data.data.data.communityCards;
        $scope.winnerString = _.join(_.map($scope.winners, function (n) {
          return "Player " + n.playerNo;
        }), " & ");
      });
    };
    $scope.showWinner();
  })
  .controller('PlayerCtrl', function ($scope, $stateParams, selectPlayer, apiService, $interval, $state) {
    io.socket.on("broadcastWinner", function (data) {
      $state.go('winner');
    });
    io.socket.on("broadcastNewGame", function (data) {
      $state.go('player');
    });

    io.socket.on("Update", function (data) {
      $scope.player = data.playerCards[selectPlayer.getPlayer() - 1];
      $scope.communityCards = data.communityCards;
      $scope.$apply();
    });

    $scope.getTabDetail = function () {

      apiService.callApiWithData('Player/getAll', {
        tabId: selectPlayer.getPlayer()
      }, function (data) {
        $scope.player = data.data.data.playerCards[selectPlayer.getPlayer() - 1];
        $scope.communityCards = data.data.data.communityCards;
      });
    };
    $scope.moveTurn = function () {
      apiService.callApiWithData('Player/changeTurn', {
        tabId: selectPlayer.getPlayer()
      }, function (data) {
        $scope.getTabDetail();
      });
    };
    $scope.foldPlayerNo = function () {
      apiService.callApiWithData('Player/fold', {
        tabId: selectPlayer.getPlayer()
      }, function (data) {
        $scope.getTabDetail();
      });
    };
    $scope.getTabDetail();
  })
  .controller('TabCtrl', function ($scope, $stateParams, selectPlayer, $state) {
    $scope.players = [1, 2, 3, 4, 5, 6, 7, 8];
    $scope.currentPlayer = selectPlayer.getPlayer();
    $scope.selectPlayerNo = function (currentPlayer) {
      selectPlayer.setPlayer(currentPlayer);
    };
  })
  .controller('PlaylistCtrl', function ($scope, $stateParams) {});