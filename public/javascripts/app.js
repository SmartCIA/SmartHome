angular.module('appSmart', ['ngRoute', 'appSmart.service'])
.controller('SmartController', function($scope, SmartService){

    $scope.relay_bathroomOn = false;
    $scope.relay_kitchenOn = false;
    $scope.relay_connect_allOn = false;
    $scope.relay_disconnect_allOn = false;
    $scope.relay_roomOn = false;
    $scope.relay_room2On = false;
    $scope.relay_bedroomOn = false;
    $scope.control_curtain = false;
  
    
    $scope.toggle_relay_bathroom = function() {
        SmartService.toggle_relay_bathroom().then(function(data){
            $scope.relay_bathroomOn = !$scope.relay_bathroomOn;
		});        
    }
    
    $scope.toggle_relay_kitchen = function() {
        SmartService.toggle_relay_kitchen().then(function(data){
            $scope.relay_kitchenOn = !$scope.relay_kitchenOn;
		});        
    }
    
    $scope.toggle_relay_bedroom = function() {
        SmartService.toggle_relay_bedroom().then(function(data){
            $scope.relay_bedroomOn = !$scope.relay_bedroomOn;
		});        
    }
    
    $scope.toggle_relay_room = function() {
        SmartService.toggle_relay_room().then(function(data){
            $scope.relay_roomOn = !$scope.relay_roomOn;
		});        
    }
    
    $scope.toggle_relay_room2 = function() {
        SmartService.toggle_relay_room2().then(function(data){
            $scope.relay_room2On = !$scope.relay_room2On;
		});        
    }
    
    $scope.toggle_relay_connect_all = function() {
        SmartService.toggle_relay_connect_all().then(function(data){
            $scope.relay_connect_allOn = !$scope.relay_connect_allOn;
		});        
    }
    
    $scope.toggle_control_curtain = function() {
        SmartService.toggle_control_curtain().then(function(data){
            $scope.control_curtain = !$scope.control_curtain;
		});        
    }

});