angular.module('app.run').run(['$state','PermissionStore','OAuth','$rootScope','authService',
function($state,PermissionStore,OAuth,$rootScope,authService){
    PermissionStore.definePermission('user-permission',function(){

      return OAuth.isAuthenticated();
    });

    $rootScope.$on('event:auth-loginRequired',function(event, data){
          OAuth.getRefreshToken().then(function(data){

              authService.loginConfirmed();
          },function(responseError){
              $state.go('logout');
          })
    });


  }]);
