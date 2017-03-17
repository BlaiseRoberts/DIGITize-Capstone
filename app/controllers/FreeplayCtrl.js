"use strict";
	
app.controller('FreeplayCtrl', function ($scope, $document, AuthFactory, ProfileFactory, $routeParams) {
///////////////////
///Initialize
///////////////////
	$document.ready(function(){
		$('.modal').modal();
	});	

	let user = AuthFactory.getUser();
	ProfileFactory.getSingleProfile(user).then((result)=>{
		let profileId = Object.keys(result)[0];
		$scope.profile = result[profileId];
		$scope.challenge = $scope.profile.challenges[$routeParams.gameIndex];
		$scope.tileOrder = $scope.challenge.tileOrder;
		$scope.total = $scope.tileOrder.length;
	});

	
	$scope.showKeys = false;
	$scope.correct = 0;

	$scope.toggleKeys = ()=>{
		if (!$scope.showKeys){
			$scope.showKeys = true;
		} else{
			$scope.showKeys = false;
		}
	};

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
			$scope.percent = Math.floor(($scope.correct/$scope.total)*100);
			$('#completeModal').modal('open');
		}
	};
	$scope.keyPress = function(e){
        if (e.keyCode == 32) { 
        	e.preventDefault();
       		$scope.press1();
	    }
	    if (e.keyCode == 84) { 
	       $scope.press2();
	    }
	    if (e.keyCode == 55) { 
	       $scope.press3();
	    }
	    if (e.keyCode == 73) { 
	       $scope.press4();
	    }
	    if (e.keyCode == 76) { 
	       $scope.press5();
	    }
	};

	

});