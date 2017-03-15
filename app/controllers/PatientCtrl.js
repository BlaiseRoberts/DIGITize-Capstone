"use strict";

app.controller('PatientCtrl', function ($scope, AuthFactory, ProfileFactory, $routeParams, $window) {
///////////////////
///Initialize
///////////////////
	$(document).ready(function(){
	$('.modal').modal();
	$('.datepicker').pickadate({
	    selectMonths: true, // Creates a dropdown to control month
	    selectYears: 5 // Creates a dropdown of 5 years to control year
	  });
	});

	let user = AuthFactory.getUser();

	ProfileFactory.getSingleProfile(user).then((result)=>{
		let profileId = Object.keys(result)[0];
		$scope.profile = result[profileId];
		$scope.patient = $scope.profile.patients[$routeParams.index];
	});

	$scope.removePatient = ()=>{
		$scope.profile.patients.splice($routeParams.index, 1);
		ProfileFactory.updateProfile($scope.profile.id, $scope.profile).then(()=>{
			$window.location.href = "#!/profile";
		});
	};

	$scope.editPatient = ()=>{
		$scope.profile.patients[$routeParams.index] = $scope.patient;
		ProfileFactory.updateProfile($scope.profile.id, $scope.profile).then(()=>{
			$scope.patient = $scope.profile.patients[$routeParams.index];
		});
	};



});