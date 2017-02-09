angular.module('ionic')

.run(function($ionicPlatform,$state,$ionicHistory){

 $ionicPlatform.registerBackButtonAction(function (event) {
    if($state.current.name=="tabsController.login" || $state.current.name=="tabsController.mensagens"){
      navigator.app.exitApp();
    }
    else {
       $ionicHistory.backHistory();
    }
  }, 100);

});
