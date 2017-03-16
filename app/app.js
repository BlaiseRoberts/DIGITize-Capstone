"use strict";

var app = angular.module("RehabApp", ["ngRoute", "angular.filter", "angular-loading-bar"]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/', {
    }).
    when('/profile',{
        templateUrl: 'partials/profile.html',
        controller: "ProfileCtrl"
    }).
    when('/patient/:index',{
        templateUrl: 'partials/patient-profile.html',
        controller: "PatientCtrl"
    }).
    when('/freeplay',{
        templateUrl: 'partials/freeplay.html',
        controller: "FreeplayCtrl"
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