angular.module('appSmart.service', [])
.factory('SmartService', function($q, $http){
	var service = {

       toggle_relay_bathroom: function(){
			var d = $q.defer();
			$http.get('/relay_bathroom')
			.success(function(data, status){
				d.resolve(data);
			}).error(function(data, status){
				d.reject(data);
         });
			return d.promise;
		},
        
        toggle_relay_kitchen: function(){
			var d = $q.defer();
			$http.get('/relay_kitchen')
			.success(function(data, status){
				d.resolve(data);
			}).error(function(data, status){
				d.reject(data);
         });
			return d.promise;
		},
        
        toggle_relay_room: function(){
			var d = $q.defer();
			$http.get('/relay_room_lampada1')
			.success(function(data, status){
				d.resolve(data);
			}).error(function(data, status){
				d.reject(data);
         });
			return d.promise;
		},
        
        toggle_relay_room2: function(){
			var d = $q.defer();
			$http.get('/relay_room_lampada2')
			.success(function(data, status){
				d.resolve(data);
			}).error(function(data, status){
				d.reject(data);
         });
			return d.promise;
		},
        
        toggle_relay_connect_all: function(){
			var d = $q.defer();
			$http.get('/relay_connect_all')
			.success(function(data, status){
				d.resolve(data);
			}).error(function(data, status){
				d.reject(data);
         });
			return d.promise;
		},

        toggle_relay_bedroom: function(){
			var d = $q.defer();
			$http.get('/relay_bedroom')
			.success(function(data, status){
				d.resolve(data);
			}).error(function(data, status){
				d.reject(data);
         });
			return d.promise;
		},
        
        toggle_control_curtain: function(){
			var d = $q.defer();
			$http.get('/control_curtain')
			.success(function(data, status){
				d.resolve(data);
			}).error(function(data, status){
				d.reject(data);
         });
			return d.promise;
		}
	};

	return service;
});