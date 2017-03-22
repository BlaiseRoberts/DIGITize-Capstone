"use strict";

app.controller('FreeplayCtrl', function ($scope, $document, AuthFactory, ProfileFactory, $routeParams, GameFactory) {

	//set up variables
	$scope.challenge = {
		title: "Freeplay",
		type: "Right Hand",
		message: "Shows the button you pressed below:",
		test: true
	};
	$scope.profile = {
		firstName: "Blaise",
		lastName: "Roberts"
	};
	$scope.tileOrder = [];
	
	$scope.showKeys = false;

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

	let tile1 = {value: 1, color: "green accent-3"};
	let tile2 = {value: 2, color: "yellow"};	
	let tile3 = {value: 3, color: "cyan"};
	let tile4 = {value: 4, color: "red darken-1"};
	let tile5 = {value: 5, color: "deep-purple accent-1"};


	$scope.press1 = ()=>{
		let sound = audio1.cloneNode();
		sound.play();
		$scope.tileOrder.unshift(tile1);
	};
	$scope.press2 = ()=>{
		let sound = audio2.cloneNode();
		sound.play();
		$scope.tileOrder.unshift(tile2);
	};
	$scope.press3 = ()=>{
		let sound = audio3.cloneNode();
		sound.play();
		$scope.tileOrder.unshift(tile3);
	};
	$scope.press4 = ()=>{
		let sound = audio4.cloneNode();
		sound.play();
		$scope.tileOrder.unshift(tile4);
	};
	$scope.press5 = ()=>{
		let sound = audio5.cloneNode();
		sound.play();
		$scope.tileOrder.unshift(tile5);
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