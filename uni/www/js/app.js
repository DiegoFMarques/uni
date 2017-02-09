// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

'use strict';

angular.module('app.run',[]);
angular.module('app.routes',[]);
angular.module('app.controllers',[]);
angular.module('app', ['ngRoute','ionic','ngCordova' ,'app.run','app.controllers',
 'app.routes', 'app.services', 'app.directives','angular-oauth2','permission', 'http-auth-interceptor'])

.config(['$routeProvider','OAuthProvider','OAuthTokenProvider','$provide', function($routeProvider,OAuthProvider,OAuthTokenProvider, $provide) {

  OAuthProvider.configure({
      baseUrl: 'http://localhost:8000',
      clientId: 'secretid1',
      clientSecret: 'secret', // optional
      grantPath: '/oauth/access_token'
    });

    OAuthTokenProvider.configure({
      name: 'token',
      options: {
        secure: false
      }
    });

   $provide.decorator('OAuthToken',['sessionService','$delegate', function(sessionService, $delegate){

      Object.defineProperties($delegate,{
        setToken:{
          value: function(data){
              return sessionService.setObject('token', data);
          },
          enumerable: true,
          configurable: true,
          writable: true

        },
        getToken:{
          value: function(){
              return sessionService.getObject('token');
          },
          enumerable: true,
          configurable: true,
          writable: true
        },
        removeToken:{
          value: function(){
              sessionService.setObject('token', null);
          },
          enumerable: true,
          configurable: true,
          writable: true
        }
      });
      return $delegate;
  }]);

  $provide.decorator('oauthInterceptor',['$delegate', function($delegate){

    delete $delegate['responseError'];

     return $delegate;
  }]);


}])




.config( function( $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('top'); //Coloca a guia no topo

})

.run(function($ionicPlatform) {



  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
