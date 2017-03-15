"use strict";

app.controller('SearchCtrl', function ($scope, ProfileFactory, AuthFactory) {
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
		$scope.profile.id = profileId;
	  });
	  ProfileFactory.getDoctorProfiles().then((result)=>{
	  	$scope.doctors = result;
	  	console.log($scope.doctors);
	  });
	  ProfileFactory.getPatientProfiles().then((result)=>{
	  	$scope.patients = result;
	  	console.log($scope.patients);
	  });

	  $scope.selfCheck = (item)=>{
	  	return (item.id === $scope.profile.id); 
	  };
	  $scope.requestCheck = (item)=>{
	  	if (!item.openRequests){
	  		item.openRequests = [];
	  	}
	  	for (var i = 0; i < item.openRequests.length; i++) {
	  		return item.openRequests[i].match($scope.profile.id);
	  	}
	  };

	  $scope.sendRequest = (item)=>{
	  	console.log("you send a request");
	  	if (!item.openRequests){
	  		item.openRequests = [];
	  	}
	  	item.openRequests.push($scope.profile.id);
	  	if (!$scope.profile.openRequests){
	  		$scope.profile.openRequests = [];
	  	}
	  	$scope.profile.openRequests.push(item.id);
	  	ProfileFactory.updateProfile(item.id, item).then(()=>{
	  		ProfileFactory.updateProfile($scope.profile.id, $scope.profile).then(()=>{
	  			console.log("update complete");
	  		});
	  	});
	  };


});
