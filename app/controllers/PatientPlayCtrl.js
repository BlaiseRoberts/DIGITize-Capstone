"use strict";
	
app.controller('PatientPlayCtrl', function ($scope, $document, AuthFactory, ProfileFactory, $routeParams, GameFactory) {
///////////////////
///Initialize
///////////////////
	$document.ready(function(){
		$('.modal').modal({dismissible: false});
	});	


	//sets up patient and prepares empty array to store game info
	$scope.patient = GameFactory.getPatient(); 
	if (!$scope.patient.games){
		$scope.patient.games = [];
	}
	let OriginalOrder = [];
	let user = AuthFactory.getUser();
	ProfileFactory.getSingleProfile(user).then((result)=>{
		let profileId = Object.keys(result)[0];
		$scope.profile = result[profileId];
		$scope.challenge = $scope.profile.challenges[$routeParams.gameIndex];
		$scope.challenge.message = "Press the button below that matches the current tile";		
		$scope.tileOrder = $scope.challenge.tileOrder;
		$scope.total = $scope.tileOrder.length;
		$scope.game = {
			title: $scope.challenge.title,
			type: $scope.challenge.type,
			totalTiles: $scope.total,
			date: Date()
		};
		

	});


	let calculate = ()=>{
		//finish calculating results and push to $scope.patient
			$scope.percent = Math.floor(($scope.correct/$scope.total)*100);
			$scope.game.correct = $scope.correct;
			$scope.game.percent = $scope.percent;
			$scope.patient.games.push($scope.game);
	};
	let postResults = ()=>{
		//reset challenge to full array and update profile with patient progress
			ProfileFactory.getSingleProfile(user).then((result)=>{
				let profileId = Object.keys(result)[0];
				$scope.profile = result[profileId];
				$scope.profile.patients[$scope.patient.index] = $scope.patient;
				ProfileFactory.updateProfile($scope.profile.id, $scope.profile).then(()=>{
					$('#patientComplete').modal('open');
				});
			});
	};
	

	
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

	var audio1 = new Audio('sound/1effect.m4a');
	var audio2 = new Audio('sound/2effect.m4a');
	var audio3 = new Audio('sound/3effect.m4a');
	var audio4 = new Audio('sound/4effect.m4a');
	var audio5 = new Audio('sound/5effect.m4a');
	var missAudio = new Audio('sound/bassDelete.m4a');


	$scope.press1 = ()=>{
		if($scope.tileOrder[0].value == 1){
			let sound = audio1.cloneNode();
			sound.play();
  			Materialize.toast('You did it!', 3000, 'green lighten-2'); 
			$scope.correct++;
		}
		if($scope.tileOrder[0].value != 1){
			let sound = missAudio.cloneNode();
			sound.play();
  			Materialize.toast('Keep Trying!', 3000, 'light-blue darken-4'); 			
		}
		$scope.tileOrder.shift();
		if($scope.tileOrder.length === 0){
			calculate();
			postResults();		
		}
	};
	$scope.press2 = ()=>{
		if($scope.tileOrder[0].value == 2){
			let sound = audio2.cloneNode();
			sound.play();
  			Materialize.toast('You did it!', 3000, 'green lighten-2'); 			
			$scope.correct++;
		}
		if($scope.tileOrder[0].value != 2){
			let sound = missAudio.cloneNode();
			sound.play();
  			Materialize.toast('Keep Trying!', 3000, 'light-blue darken-4'); 			
		}
		$scope.tileOrder.shift();
		if($scope.tileOrder.length === 0){
			calculate();
			postResults();	
		}
	};
	$scope.press3 = ()=>{
		if($scope.tileOrder[0].value == 3){
			let sound = audio3.cloneNode();
			sound.play();
  			Materialize.toast('You did it!', 3000, 'green lighten-2'); 			
			$scope.correct++;
		}
		if($scope.tileOrder[0].value != 3){
			let sound = missAudio.cloneNode();
			sound.play();
  			Materialize.toast('Keep Trying!', 3000, 'light-blue darken-4'); 			
		}
		$scope.tileOrder.shift();
		if($scope.tileOrder.length === 0){
			calculate();
			postResults();	
		}
	};
	$scope.press4 = ()=>{
		if($scope.tileOrder[0].value == 4){
			let sound = audio4.cloneNode();
			sound.play();
  			Materialize.toast('You did it!', 3000, 'green lighten-2'); 			
			$scope.correct++;
		}
		if($scope.tileOrder[0].value != 4){
			let sound = missAudio.cloneNode();
			sound.play();
  			Materialize.toast('Keep Trying!', 3000, 'light-blue darken-4'); 			
		}
		$scope.tileOrder.shift();
		if($scope.tileOrder.length === 0){
			calculate();
			postResults();	
		}
	};
	$scope.press5 = ()=>{
		if($scope.tileOrder[0].value == 5){
			let sound = audio5.cloneNode();
			sound.play();
  			Materialize.toast('You did it!', 3000, 'green lighten-2'); 			
			$scope.correct++;
		}
		if($scope.tileOrder[0].value != 5){
			let sound = missAudio.cloneNode();
			sound.play();
  			Materialize.toast('Keep Trying!', 3000, 'light-blue darken-4'); 			
		}
		$scope.tileOrder.shift();
		if($scope.tileOrder.length === 0){
			calculate();
			postResults();	
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