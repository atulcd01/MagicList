var $scope, $location;
var app = angular.module("Application", ['ngSanitize']);
var ids = 0;

app.controller('Controller', function($scope, $location,  $timeout, $interval,$window) {

    $scope.validate = function() {
    	var xyz =$scope.a+$scope.b+$scope.c+$scope.d;
       //alert(xyz);
    	//$scope.a='';$scope.b='';$scope.c='';$scope.d='';
    	if(xyz.length==4)
       if(localStorage.getItem('xyz')==undefined){
    	   localStorage.setItem('xyz',xyz); 
       }else{
    	   if(localStorage.getItem('xyz')==xyz){
    		   //alert('success');
    		   //$location.href='index.html';
    		   
    		   window.location.href = 'dayplan.html';
    	   }
    		   
       }
    	$scope.a='';$scope.b='';$scope.c='';$scope.d='';
    };
});