"use strict";

var app = angular.module("RehabApp", ["ngRoute", "angular.filter", "angular-loading-bar"]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'partials/home.html',
        controller: "HomeCtrl"
    }).
    when('/profile',{
        templateUrl: 'partials/profile.html',
        controller: "ProfileCtrl"
    }).
    when('/patient/:patientIndex',{
        templateUrl: 'partials/patient-profile.html',
        controller: "PatientCtrl"
    }).
    when('/freeplay',{
        templateUrl: 'partials/freeplay.html',
        controller: "FreeplayCtrl"
    }).
    when('/challenges',{
        templateUrl: 'partials/create.html',
        controller: "CreateCtrl"
    }).
    when('/challenges/edit/:gameIndex',{
        templateUrl: 'partials/edit-game.html',
        controller: "EditGameCtrl"
    }).
    when('/challenges/test/:gameIndex',{
        templateUrl: 'partials/freeplay.html',
        controller: "TestCtrl"
    }).
    when('/patient/challenge/:gameIndex',{
        templateUrl: 'partials/freeplay.html',
        controller: "PatientPlayCtrl"
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