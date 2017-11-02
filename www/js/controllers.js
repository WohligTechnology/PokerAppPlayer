angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {})


  .controller('WinnerCtrl', function ($scope, $stateParams, apiService, $state) {
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


    io.socket.on("Update", function (data) {
      $state.go("player");
    });

  })
  .controller('PlayerCtrl', function ($scope, $stateParams, selectPlayer, apiService, $interval, $state) {
    io.socket.on("Winner", function (data) {
      $state.go('winner');
    });

    io.socket.on("Update", function (data) {
      $scope.player = _.find(data.playerCards, function (player) {
        return player.playerNo == selectPlayer.getPlayer();
      });
      $scope.communityCards = data.communityCards;
      $scope.$apply();
    });

    $scope.getTabDetail = function () {
      apiService.callApiWithData('Player/getAll', {
        tabId: selectPlayer.getPlayer()
      }, function (data) {
        $scope.player = _.find(data.data.data.playerCards, function (player) {
          return player.playerNo == selectPlayer.getPlayer();
        });
        $scope.communityCards = data.data.data.communityCards;
      });
    };
    $scope.getTabDetail();

    $scope.moveTurn = function () {
      $scope.player.isTurn = true;
      apiService.callApiWithData('Player/moveTurn', {}, function (data) {});
    };
    $scope.foldPlayer = function () {
      $scope.player.isTurn = true;
      apiService.callApiWithData('Player/fold', {}, function (data) {});
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