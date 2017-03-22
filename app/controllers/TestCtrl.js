"use strict";
	
app.controller('TestCtrl', function ($scope, $document, AuthFactory, ProfileFactory, $routeParams, GameFactory) {
///////////////////
///Initialize
///////////////////
	$document.ready(function(){
		$('.modal').modal({dismissible: false});
	});	



	//sets up patient and prepares empty array to store game info
	let originalOrder = [];
	let user = AuthFactory.getUser();
	ProfileFactory.getSingleProfile(user).then((result)=>{
		let profileId = Object.keys(result)[0];

		//set up variables
		$scope.profile = result[profileId];
		$scope.challenge = $scope.profile.challenges[$routeParams.gameIndex];
		$scope.challenge.message = "Press the button below that matches the current tile";
		originalOrder = $scope.challenge.tileOrder;
		$scope.tileOrder = $scope.challenge.tileOrder;
		$scope.total = $scope.tileOrder.length;
		$scope.game = {
			title: $scope.challenge.title,
			type: $scope.challenge.type,
			totalTiles: $scope.total,
			date: Date()
		};

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

////////////////////
//////Sounds on Buttons
////////////////////

	var audio1 = new Audio('sound/1effectshort.wav');
	var audio2 = new Audio('sound/2effect.m4a');
	var audio3 = new Audio('sound/3effect.m4a');
	var audio4 = new Audio('sound/4effect.m4a');
	var audio5 = new Audio('sound/5effect.m4a');





	$scope.press1 = ()=>{
		let sound = audio1.cloneNode();
		sound.play();
		if($scope.tileOrder[0].value == 1){
			$scope.correct++;
		}
		$scope.tileOrder.shift();
		if($scope.tileOrder.length === 0){
			$scope.percent = Math.floor(($scope.correct/$scope.total)*100);
			$('#completeModal').modal('open');
		}
	};
	$scope.press2 = ()=>{
		let sound = audio2.cloneNode();
		sound.play();
		if($scope.tileOrder[0].value == 2){
			$scope.correct++;
		}
		$scope.tileOrder.shift();
		if($scope.tileOrder.length === 0){
			$scope.percent = Math.floor(($scope.correct/$scope.total)*100);
			$('#completeModal').modal('open');
		}
	};
	$scope.press3 = ()=>{
		let sound = audio3.cloneNode();
		sound.play();
		if($scope.tileOrder[0].value == 3){
			$scope.correct++;
		}
		$scope.tileOrder.shift();
		if($scope.tileOrder.length === 0){
			$scope.percent = Math.floor(($scope.correct/$scope.total)*100);
			$('#completeModal').modal('open');
		}
	};
	$scope.press4 = ()=>{
		let sound = audio4.cloneNode();
		sound.play();
		if($scope.tileOrder[0].value == 4){
			$scope.correct++;
		}
		$scope.tileOrder.shift();
		if($scope.tileOrder.length === 0){
			$scope.percent = Math.floor(($scope.correct/$scope.total)*100);
			$('#completeModal').modal('open');
		}
	};
	$scope.press5 = ()=>{
		let sound = audio5.cloneNode();
		sound.play();
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
	    if ((e.keyCode == 84 && $scope.challenge.type == "Right Hand") || (e.keyCode == 89 && $scope.challenge.type == "Left Hand")) { 
	       $scope.press2();
	    }
	    if ((e.keyCode == 55 && $scope.challenge.type == "Right Hand") || (e.keyCode == 53 && $scope.challenge.type == "Left Hand")) { 
	       $scope.press3();
	    }
	    if ((e.keyCode == 73 && $scope.challenge.type == "Right Hand") || (e.keyCode == 69 && $scope.challenge.type == "Left Hand")) { 
	       $scope.press4();
	    }
	    if ((e.keyCode == 76 && $scope.challenge.type == "Right Hand") || (e.keyCode == 83 && $scope.challenge.type == "Left Hand")) { 
	       $scope.press5();
	    }
	};

	

});