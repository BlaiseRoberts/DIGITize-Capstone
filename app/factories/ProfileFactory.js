"use strict";

app.factory('ProfileFactory', function (FBCreds, $q, $http) {

	let postNewProfile = (newProfile)=>{
		return $q((resolve, reject) =>{
			$http.post(`${FBCreds.databaseURL}/profile.json`,
				angular.toJson(newProfile))
			.then((ObjectFromFirebase)=>{
				resolve(ObjectFromFirebase);
			});
		});
	};

	let getSingleProfile = (user) => {
		return $q((resolve, reject)=>{
			$http.get(`${FBCreds.databaseURL}/profile.json?orderBy="uid"&equalTo="${user}"`).then((profile)=>{
				resolve(profile.data);
			})
			.catch((error)=>{
				reject(error);
			});
		});
	};

	let updateProfile = (profileId, editedProfile) =>{
		return $q((resolve)=>{
			$http.patch(`${FBCreds.databaseURL}/profile/${profileId}.json`,
				angular.toJson(editedProfile))
			.then((response)=>{
				resolve(response);
			});
		});
	};









	return{postNewProfile, getSingleProfile, updateProfile};

});