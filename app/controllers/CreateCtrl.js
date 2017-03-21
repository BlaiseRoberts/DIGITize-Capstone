"use strict";

app.controller('CreateCtrl', function ($scope, AuthFactory, ProfileFactory, $window) {
///////////////////
///Initialize
///////////////////
	  $(document).ready(function(){
	    $('.modal').modal();
	    $('ul.tabs').tabs();
	  });


	
	let user = AuthFactory.getUser();

	ProfileFactory.getSingleProfile(user).then((result)=>{
		let profileId = Object.keys(result)[0];
		$scope.profile = result[profileId];
	});

	$scope.challenge = {
		title: null,
		type: "Right Hand",
		tileOrder: []
	};
////////////////////
//////Sounds on Buttons
////////////////////

	var audio1 = new Audio('sound/1effect.m4a');
	var audio2 = new Audio('sound/2effect.m4a');
	var audio3 = new Audio('sound/3effect.m4a');
	var audio4 = new Audio('sound/4effect.m4a');
	var audio5 = new Audio('sound/5effect.m4a');
	var deleteAudio = new Audio('sound/bassDelete.m4a');


	let tile1 = {value: 1, color: "green accent-3"};
	let tile2 = {value: 2, color: "yellow"};	
	let tile3 = {value: 3, color: "cyan"};
	let tile4 = {value: 4, color: "red darken-1"};
	let tile5 = {value: 5, color: "deep-purple accent-1"};

	$scope.add1Tile = ()=>{
		let sound = audio1.cloneNode();
		sound.play();
		$scope.challenge.tileOrder.push(tile1);
	};
	$scope.add2Tile = ()=>{
		let sound = audio2.cloneNode();
		sound.play();
		$scope.challenge.tileOrder.push(tile2);
	};
	$scope.add3Tile = ()=>{
		let sound = audio3.cloneNode();
		sound.play();
		$scope.challenge.tileOrder.push(tile3);
	};
	$scope.add4Tile = ()=>{
		let sound = audio4.cloneNode();
		sound.play();
		$scope.challenge.tileOrder.push(tile4);
	};
	$scope.add5Tile = ()=>{
		let sound = audio5.cloneNode();
		sound.play();
		$scope.challenge.tileOrder.push(tile5);
	};
	$scope.removeTile = (index)=>{
		let sound = deleteAudio.cloneNode();
		sound.play();
		$scope.challenge.tileOrder.splice(index, 1);
	};
	$scope.addChallenge = ()=>{
		if(!$scope.profile.challenges){
			$scope.profile.challenges = [];
		}
		$scope.profile.challenges.push($scope.challenge);
		ProfileFactory.updateProfile($scope.profile.id, $scope.profile).then(()=>{
			$scope.challenge = {
				title: null,
				type: null,
				tileOrder: []
			};
		});
	};
	$scope.deleteChallenge = (index)=>{
		$scope.profile.challenges.splice(index, 1);
		ProfileFactory.updateProfile($scope.profile.id, $scope.profile).then(()=>{
			
		});
	};
	$scope.testChallenge = (index)=>{
		$window.location.href = "#!/challenges/test/"+index;
	};
});