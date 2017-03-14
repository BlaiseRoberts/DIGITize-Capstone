"use strict";

var app = angular.module("RehabApp", ["ngRoute"]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/', {
    }).
    when('/profile',{
        templateUrl: 'partials/profile.html',
        controller: "DocProfileCtrl"
    }).
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