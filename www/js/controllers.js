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
      if (data.newGame) {
        $scope.removeWinner();
      }
    }

    $scope.raise = function () {
      $scope.player.isTurn = false;
      apiService.raise(function (data) {});
    };
    //     apiService.allIn(function (data) {
    //   console.log(data.data);
    // });
    $scope.allIn = function () {
      $scope.player.isTurn = false;
      apiService.allIn(function (data) {
        console.log(data.data.data.addTurn[0].isAllIn);
        $scope.allInPlayer = data.data.data.addTurn[0].isAllIn;
        if ($scope.allInPlayer == false) {

        }
      });
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

    $scope.showWinner = function (data) {
      console.log(data);
      console.log("Show Winner Called");
    };

    $scope.removeWinner = function () {
      console.log("Remove Winner Called");
    };

    io.socket.on("ShowWinner", $scope.showWinner);

  })
  .controller('TabCtrl', function ($scope, $stateParams, selectPlayer, apiService, $state) {
    $scope.players = ["1", "2", "3", "4", "5", "6", "7", "8"];
    $scope.form = {};
    $scope.form.adminurl = apiService.getAdminUrl();
    $scope.form.player = selectPlayer.getPlayer();
    $scope.saveForm = function () {
      apiService.saveAdminUrl($scope.form.adminurl);
      selectPlayer.setPlayer($scope.form.player);
      window.location.href = window.location.origin;
    };
  })
  .controller('PlaylistCtrl', function ($scope, $stateParams) {})
  .controller('AnimatedCardCtrl', function ($scope, $stateParams, $element, $attr, $timeout) {

    // $ionicGesture.on('dragup', this.onDrag, $element);
    // $ionicGesture.on('dragend', this.onDragEnd, $element);

  });