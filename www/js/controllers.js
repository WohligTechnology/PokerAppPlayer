angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
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

  io.socket.on("update", function (data) {
    $scope.player = data.data.data.playerCards[selectPlayer.getPlayer() - 1];
    console.log($scope.playersCards);
    $scope.communityCards = data.data.data.communityCards;
  });
  console.log('inside PlayerCtrl');
     $scope.getTabDetail = function(){
     
      apiService.callApiWithData('Player/getTabDetail',{tabId:selectPlayer.getPlayer()},function(data){
        $scope.player = data.data.data.playerCards[0];
        console.log($scope.playersCards);
        $scope.communityCards = data.data.data.communityCards;
      });
     }
     $scope.moveTurn = function(){
      apiService.callApiWithData('Player/changeTurn',{tabId:selectPlayer.getPlayer()},function(data){
        $scope.getTabDetail();   
      });
       console.log('inside moveturn');
     }
     $scope.foldPlayerNo = function(){
      apiService.callApiWithData('Player/fold',{tabId:selectPlayer.getPlayer()},function(data){
        $scope.getTabDetail();   
      });
      
     }
     $scope.getTabDetail();
      
    })
  .controller('TabCtrl', function($scope, $stateParams, selectPlayer, $state) {
       $scope.players = [1,2,3,4,5,6,7,8];  
       $scope.currentPlayer = selectPlayer.getPlayer();
       $scope.selectPlayerNo = function(currentPlayer){
        selectPlayer.setPlayer(currentPlayer);
        //$state.go('player');
       }
       
    })

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
