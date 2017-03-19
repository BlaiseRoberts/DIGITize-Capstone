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

	$scope.press1 = ()=>{
		if($scope.tileOrder[0].value == 1){
  			Materialize.toast('You did it!', 3000, 'green lighten-2'); 
			$scope.correct++;
		}
		if($scope.tileOrder[0].value != 1){
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
  			Materialize.toast('You did it!', 3000, 'green lighten-2'); 			
			$scope.correct++;
		}
		if($scope.tileOrder[0].value != 2){
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
  			Materialize.toast('You did it!', 3000, 'green lighten-2'); 			
			$scope.correct++;
		}
		if($scope.tileOrder[0].value != 3){
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
  			Materialize.toast('You did it!', 3000, 'green lighten-2'); 			
			$scope.correct++;
		}
		if($scope.tileOrder[0].value != 4){
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
  			Materialize.toast('You did it!', 3000, 'green lighten-2'); 			
			$scope.correct++;
		}
		if($scope.tileOrder[0].value != 5){
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