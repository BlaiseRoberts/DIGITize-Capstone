"use strict";

app.controller('DocProfileCtrl', function ($scope, ProfileFactory, AuthFactory) {
///////////////////
///Initialize
///////////////////
	  $(document).ready(function(){
	    $('.modal').modal({dismissible: false});
	    $('.datepicker').pickadate({
		    selectMonths: true // Creates a dropdown to control month
		  });
	  });

	let user = AuthFactory.getUser();

	let profileId = "";

	ProfileFactory.getSingleProfile(user).then((result)=>{
		console.log(user);
		profileId = Object.keys(result)[0];
		console.log(profileId);
		$scope.profile = result[profileId];

	});


	$scope.patchProfile = ()=>{
		ProfileFactory.updateProfile(profileId, $scope.profile).then(()=>{
			console.log("you did it!");
		});
	};

});