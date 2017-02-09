'use strict';
angular.module('app.services', ['ngResource'])


.factory('sessionService', ['$window', function( $window){
	return{
		set:function(key, value){
			$window.localStorage[key] = value;
			return $window.localStorage[key];
		},
		get:function(key, defaultValue){
			return $window.localStorage[key] || defaultValue;
		},
		setObject:function(key, value){
			$window.localStorage[key] = JSON.stringify(value);
			return this.getObject(key);
		},
		getObject:function(key){
			return JSON.parse($window.localStorage[key] || null);
		},

	};
}])

.factory('BlankFactory', [function(){

}])

.factory('User', ['$resource', function($resource){
        return $resource('http://localhost:8000/api/authenticated', {}, {
            query: {
                isArray: false
            },
            authenticated: {
                method: 'GET',
                url: 'http://localhost:8000/api/authenticated'
            }
			});
}])

.service('BlankService', [function(){

}])
