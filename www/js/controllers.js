angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {


  })


  .controller('WinnerCtrl', function ($scope, $stateParams, apiService, $state) {
    io.socket.on("broadcastNewGame", function (data) {
      console.log(" inside broadcastNewGame");
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
      console.log(" inside broadcastWinner");
      $state.go('winner');
    });
    io.socket.on("broadcastNewGame", function (data) {
      console.log(" inside broadcastNewGame");
      $state.go('player');
    });

    console.log('inside PlayerCtrl');
    $scope.getTabDetail = function () {

      apiService.callApiWithData('Player/getTabDetail', {
        tabId: selectPlayer.getPlayer()
      }, function (data) {
        $scope.player = data.data.data.playerCards[0];
        console.log($scope.playersCards);
        $scope.communityCards = data.data.data.communityCards;
      });
    }
    $scope.moveTurn = function () {
      apiService.callApiWithData('Player/changeTurn', {
        tabId: selectPlayer.getPlayer()
      }, function (data) {
        $scope.getTabDetail();
      });
      console.log('inside moveturn');
    }
    $scope.foldPlayerNo = function () {
      apiService.callApiWithData('Player/fold', {
        tabId: selectPlayer.getPlayer()
      }, function (data) {
        $scope.getTabDetail();
      });

    }
    $scope.getTabDetail();

  })
  .controller('TabCtrl', function ($scope, $stateParams, selectPlayer, $state) {
    $scope.players = [1, 2, 3, 4, 5, 6, 7, 8];
    $scope.currentPlayer = selectPlayer.getPlayer();
    $scope.selectPlayerNo = function (currentPlayer) {
      selectPlayer.setPlayer(currentPlayer);
      //$state.go('player');
    }

  })

  .controller('PlaylistCtrl', function ($scope, $stateParams) {});