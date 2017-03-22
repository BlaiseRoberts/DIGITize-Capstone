"use strict";

app.controller('ProfileCtrl', function ($scope, ProfileFactory, AuthFactory) {
///////////////////
///Initialize
///////////////////
	$(document).ready(function(){
	$('.modal').modal();
	$('.datepicker').pickadate({
	    selectMonths: true, // Creates a dropdown to control month
	    selectYears: 5 // Creates a dropdown of 15 years to control year
	  });
	});
        



	$scope.patient = {};
	let user = AuthFactory.getUser();

	ProfileFactory.getSingleProfile(user).then((result)=>{
		let profileId = Object.keys(result)[0];
		$scope.profile = result[profileId];
		$scope.profile.id = profileId;
	});

	$scope.patchProfile = ()=>{
		ProfileFactory.updateProfile($scope.profile.id, $scope.profile).then(()=>{
			console.log("you did it!");
		});
	};

	$scope.addPatient = ()=>{
		if (!$scope.profile.patients){
			$scope.profile.patients = [];
		}
		$scope.profile.patients.push($scope.patient);
		ProfileFactory.updateProfile($scope.profile.id, $scope.profile).then(()=>{
			$scope.patient = {};
		});
	};

});