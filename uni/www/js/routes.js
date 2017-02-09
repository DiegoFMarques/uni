angular.module('app.routes', ['ionicUIRouter','permission'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('menu', {
    cache: false,
    url: '/menu',
    templateUrl: 'templates/menu.html',
    abstract:true,
    controller: 'menuCtrl',
    data: {
        permissions:{
            only: ['user-permission']
        }
    }


  })

  .state('menu.tabsController', {
    url: '/page1',

    views: {
      'menuContent': {
    templateUrl: 'templates/tabsController.html',
    controller: 'tabsCtrl'
      }
    }

  })






  .state('login', {
    cache: false,
    url: '/page19',


    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'


  })

  .state('logout', {
    url: '/logout',
    controller: 'logoutCtrl'
  })





  .state('menu.tabsController.mensagens', {
    cache: false,
    url: '/page21',
    views: {
      'tab5': {
        templateUrl: 'templates/mensagens.html',

        controller: 'mensagensCtrl'


      }
    }
  })

$urlRouterProvider.otherwise('/page19')



});
