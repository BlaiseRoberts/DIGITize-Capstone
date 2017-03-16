"use strict";
	
app.controller('FreeplayCtrl', function ($scope, $document) {
///////////////////
///Initialize
///////////////////
	$document.ready(function(){
		$('.modal').modal();
	});	

	// $route.reload();

	$scope.tileOrder = [
		{value: 4, color: "red darken-1"},
		{value: 2, color: "yellow"},
		{value: 3, color: "cyan"},
		{value: 1, color: "green accent-3"},
		{value: 5, color: "deep-purple accent-1"}		
	];

	$scope.total = $scope.tileOrder.length;
	$scope.correct = 0;


	$scope.press1 = ()=>{
		if($scope.tileOrder[0].value == 1){
			$scope.correct++;
		}
		$scope.tileOrder.shift();
		if($scope.tileOrder.length === 0){
			$scope.percent = ($scope.correct/$scope.total)*100;
			$('#completeModal').modal('open');
		}
	};
	$scope.press2 = ()=>{
		if($scope.tileOrder[0].value == 2){
			$scope.correct++;
		}
		$scope.tileOrder.shift();
		if($scope.tileOrder.length === 0){
			$scope.percent = ($scope.correct/$scope.total)*100;
			$('#completeModal').modal('open');
		}
	};
	$scope.press3 = ()=>{
		if($scope.tileOrder[0].value == 3){
			$scope.correct++;
		}
		$scope.tileOrder.shift();
		if($scope.tileOrder.length === 0){
			$scope.percent = ($scope.correct/$scope.total)*100;
			$('#completeModal').modal('open');
		}
	};
	$scope.press4 = ()=>{
		if($scope.tileOrder[0].value == 4){
			$scope.correct++;
		}
		$scope.tileOrder.shift();
		if($scope.tileOrder.length === 0){
			$scope.percent = ($scope.correct/$scope.total)*100;
			$('#completeModal').modal('open');
		}
	};
	$scope.press5 = ()=>{
		if($scope.tileOrder[0].value == 5){
			$scope.correct++;
		}
		$scope.tileOrder.shift();
		if($scope.tileOrder.length === 0){
			$scope.percent = ($scope.correct/$scope.total)*100;
			$('#completeModal').modal('open');
		}
	};

	$document.keydown((e)=>{
	    if (e.keyCode == 32) { 
	       $scope.press1();
	       $scope.$apply();
	    }
	    if (e.keyCode == 84) { 
	       $scope.press2();
	       $scope.$apply();	    
	    }
	    if (e.keyCode == 55) { 
	       $scope.press3();
	       $scope.$apply();
	    }
	    if (e.keyCode == 73) { 
	       $scope.press4();
	       $scope.$apply();
	    }
	    if (e.keyCode == 76) { 
	       $scope.press5();
	       $scope.$apply();	       
	    }
	});

});