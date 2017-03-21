"use strict";

app.controller("NavbarCtrl", function($scope, $window, AuthFactory, ProfileFactory){
///////////////////
///Initialize
///////////////////
	  $(document).ready(function(){
	  	$(".button-collapse").sideNav({
		      menuWidth: 300, // Default is 300
		      edge: 'right', // Choose the horizontal origin
		      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
		      draggable: true // Choose whether you can drag to open on touch screens
		    }
    	);
	    $('.modal').modal({dismissible: false});
	    $('.datepicker').pickadate({
		    selectMonths: true // Creates a dropdown to control month
		  });
	  });
         

	//run these when controller loads
	$scope.ifLoggedIn = false;
	$scope.account = {
		email: "",
		password: "",
		type: ""
	};
	$scope.profile = {
		challenges: [],
		firstName: null,
		lastName: null,
		birthday: null,
		sex: null,
		location: null,
		discipline: null
	};

	$scope.submitProfile = ()=>{
		console.log($scope.profile);
		ProfileFactory.postNewProfile($scope.profile).then(()=>{
			$window.location.href= "#!/profile";
	    	$scope.ifLoggedIn = true;
		});
	};

	$scope.logout = () => {
		AuthFactory.logoutUser()
		.then(function(data){
			$window.location.url = "#!/";
			$scope.ifLoggedIn = false;
		}, function(error){
			console.log("error occured on logout");
		});
	};

	//when first loaded, make sure no one is logged in and set the currentUser
	if(AuthFactory.isAuthenticated()){
		$scope.logout();
	}


	//setup functions to be available to the app for register, login email/password, and google
	$scope.register = () => {
	    AuthFactory.createUser({
	      email: $scope.account.email,
	      password: $scope.account.password
	    })
	    .then( (userData) => {
	      $scope.login();
	    }, (error) => {
	        console.log("Error creating user:", error);
	    });
  	};

  	$scope.login = () => {
    	AuthFactory
	    .loginUser($scope.account)
	    .then( (result) => {
	    	var user = result.uid;
	    	$scope.profile.uid = user;
	    	ProfileFactory.getSingleProfile(user).then((result)=>{
				var profileId = Object.keys(result)[0];
				if (profileId === undefined) {
					$("#profileModal").modal('open');
				} else {
					$scope.profile = result[profileId];
					$window.location.href= "#!/profile";
			    	$scope.ifLoggedIn = true;
				}
			});
	    });
	};

	$scope.loginGoogle = () => {
		AuthFactory.authWithProvider()
		.then(function(result) {
			var user = result.user.uid;
			$scope.profile.uid = user;
			ProfileFactory.getSingleProfile(user).then((result)=>{
				var profileId = Object.keys(result)[0];
				if (profileId === undefined) {
					$("#profileModal").modal('open');
				} else {
					$scope.profile = result[profileId];
					$window.location.href= "#!/profile";
			    	$scope.ifLoggedIn = true;
				}
			});
	  	}).catch(function(error) {
	    	console.log("error with google login", error);
	    	var errorCode = error.code;
	    	var errorMessage = error.message;
	    	var email = error.email;
	    	var credential = error.credential;
	  	});
	};

});