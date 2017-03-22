"use strict";

var app = angular.module("RehabApp", ["ngRoute", "angular.filter", "angular-loading-bar"]);


let isAuth = (AuthFactory) => new Promise ( (resolve, reject) => {
  // console.log("running isAuth");
    AuthFactory.isAuthenticated()
    .then ( (userExists) => {
        if (userExists){
            resolve();
        }else {
            reject();
        }
    });
});



app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'partials/home.html',
        controller: "HomeCtrl"
    }).
    when('/profile',{
        templateUrl: 'partials/profile.html',
        controller: "ProfileCtrl",
        resolve: {isAuth}
    }).
    when('/patient/:patientIndex',{
        templateUrl: 'partials/patient-profile.html',
        controller: "PatientCtrl",
        resolve: {isAuth}
    }).
    when('/freeplay',{
        templateUrl: 'partials/freeplay.html',
        controller: "FreeplayCtrl"
    }).
    when('/challenges',{
        templateUrl: 'partials/create.html',
        controller: "CreateCtrl",
        resolve: {isAuth}
    }).
    when('/challenges/edit/:gameIndex',{
        templateUrl: 'partials/edit-game.html',
        controller: "EditGameCtrl",
        resolve: {isAuth}
    }).
    when('/challenges/test/:gameIndex',{
        templateUrl: 'partials/freeplay.html',
        controller: "TestCtrl",
        resolve: {isAuth}
    }).
    when('/patient/challenge/:gameIndex',{
        templateUrl: 'partials/freeplay.html',
        controller: "PatientPlayCtrl",
        resolve: {isAuth}
    }).
    // when('/search',{
    //     templateUrl: 'partials/search.html',
    //     controller: "SearchCtrl"
    // }).
    otherwise('/');
}]);


app.run(function ($location, FBCreds) {
    let authConfig = {
        apiKey: FBCreds.apiKey,
        authDomain: FBCreds.authDomain,
        databaseURL: FBCreds.databaseURL
    };
    firebase.initializeApp(authConfig);
});