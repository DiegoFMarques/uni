'use strict';
angular.module('app.controllers', ['ionic','permission'])

.controller('menuCtrl', ['$scope','$state', function($scope,$state){

	$scope.logout = function(){
		$state.go('logout');
	}
}])

.controller('tabsCtrl', function($scope) {



})






.controller('loginCtrl', ['$scope','OAuth', '$ionicSideMenuDelegate', '$state',
 '$ionicPopup','$q','sessionService', 'User','OAuthToken', function ($scope,OAuth,$ionicSideMenuDelegate,
	  $state, $ionicPopup,$q,sessionService,User,OAuthToken) {

			$scope.user = {
					username: '',
					password: ''
			};


			$scope.login = function(){
				var promise = OAuth.getAccessToken($scope.user);
				promise.then(function(data){
					return User.authenticated().$promise;
					//	$state.go('menu.tabsController.mensagens');
				//	console.log(data);
				//	console.log($cookies.getObject('token'));
				}).then(function(data){
					console.log(data.data.id);
					sessionService.set('uid', data.data.id);
					$state.go('menu.tabsController.mensagens');
				},function(responseError){
					sessionService.set('uid', null);
					OAuthToken.removeToken();
					$ionicPopup.alert({
						title: 'Advertência',
						template: 'Login e/ou senha inválidos'
					})
					console.debug(responseError);
				});

			}

			$scope.$on('$ionicView.enter', function(){
		     $ionicSideMenuDelegate.canDragContent(false);
		   });
		  $scope.$on('$ionicView.leave', function(){
		     $ionicSideMenuDelegate.canDragContent(true);
		   });



}])

.controller('logoutCtrl', ['$scope', '$state','$ionicHistory', 'OAuthToken', 'sessionService',
function($scope,$state,$ionicHistory,OAuthToken,sessionService){
	OAuthToken.removeToken();
	sessionService.set('uid', null);
	$ionicHistory.clearCache();
	$ionicHistory.clearHistory();
	$ionicHistory.nextViewOptions({
		disableBack: true,
		historyRoot: true,
	});
	$state.go('login');
}])



.controller('mensagensCtrl', ['$scope', function($scope,$ionicViewService) {
$scope.goBack = function() {
	 $ionicViewService.getBackView().go();
}


}])
