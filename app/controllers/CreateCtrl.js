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

	let tile1 = {value: 1, color: "green accent-3"};
	let tile2 = {value: 2, color: "yellow"};	
	let tile3 = {value: 3, color: "cyan"};
	let tile4 = {value: 4, color: "red darken-1"};
	let tile5 = {value: 5, color: "deep-purple accent-1"};

	$scope.add1Tile = ()=>{
		$scope.challenge.tileOrder.push(tile1);
	};
	$scope.add2Tile = ()=>{
		$scope.challenge.tileOrder.push(tile2);
	};
	$scope.add3Tile = ()=>{
		$scope.challenge.tileOrder.push(tile3);
	};
	$scope.add4Tile = ()=>{
		$scope.challenge.tileOrder.push(tile4);
	};
	$scope.add5Tile = ()=>{
		$scope.challenge.tileOrder.push(tile5);
	};
	$scope.removeTile = (index)=>{
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