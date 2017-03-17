"use strict";

app.factory('GameFactory', function () {
	
	let patient = {};
	let game = {};

	let setPatient = (x)=>{
		patient = x;
	};
	let getPatient = ()=>patient;
	let setGame = (x)=>{
		game = x;
		console.log(game);
	};
	let getGame  = ()=>{
		console.log("you're getting = ", game);
		return game;
	};


	return {setPatient, getPatient, setGame, getGame};
});