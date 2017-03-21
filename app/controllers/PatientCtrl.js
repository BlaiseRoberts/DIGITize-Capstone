"use strict";

app.controller('PatientCtrl', function ($scope, AuthFactory, ProfileFactory, $routeParams, $window, GameFactory) {
///////////////////
///Initialize
///////////////////
	$(document).ready(function(){
	$('.modal').modal();
	$('ul.tabs').tabs();
	$('.datepicker').pickadate({
	    selectMonths: true, // Creates a dropdown to control month
	    selectYears: 2 // Creates a dropdown of 5 years to control year
	  });
	});

	let user = AuthFactory.getUser();

	ProfileFactory.getSingleProfile(user).then((result)=>{
		let profileId = Object.keys(result)[0];
		$scope.profile = result[profileId];
		$scope.patient = $scope.profile.patients[$routeParams.patientIndex];
		$scope.patient.index = $routeParams.patientIndex;
		if(!$scope.patient.games){
			$scope.patient.games = [];
		}


////////////////////////
//Chart Stuff
////////////////////////


		$scope.attempts = [];
		$scope.scores = [];
		for (var i = 0; i < $scope.patient.games.length; i++) {
			$scope.attempts.push((i+1));
			$scope.scores.push($scope.patient.games[i].percent);
		}
		var data = {
		    labels: $scope.attempts,
		    datasets: [
		        {
		            label: "Patient Progress",
		            fill: true,
		            lineTension: 0.1,
		            backgroundColor: "rgba(75,192,192,0.4)",
		            borderColor: "rgba(75,192,192,1)",
		            borderCapStyle: 'butt',
		            borderDash: [],
		            borderDashOffset: 0.0,
		            borderJoinStyle: 'miter',
		            pointBorderColor: "rgba(75,192,192,1)",
		            pointBackgroundColor: "#eceff1",
		            pointBorderWidth: 1,
		            pointHoverRadius: 5,
		            pointHoverBackgroundColor: "rgba(75,192,192,1)",
		            pointHoverBorderColor: "rgba(220,220,220,1)",
		            pointHoverBorderWidth: 2,
		            pointRadius: 1,
		            pointHitRadius: 10,
		            data: $scope.scores,
		            spanGaps: false
		        }
		    ]
		};

	
		var ctx = "patientChart";
		var myLineChart = new Chart(ctx, {
		    type: 'line',
		    data: data,
		    options: {
		    	maintainAspectRatio: false,
		    	scales: {
				    yAxes: [{
				      scaleLabel: {
				        display: true,
				        labelString: '% Complete'
				      }
				    }],
				    xAxes: [{
				      scaleLabel: {
				        display: true,
				        labelString: 'Attempt #'
				      }
				    }]
				} 
		    }
		});
	});

	$scope.removePatient = ()=>{
		$scope.profile.patients.splice($routeParams.patientIndex, 1);
		ProfileFactory.updateProfile($scope.profile.id, $scope.profile).then(()=>{
			$window.location.href = "#!/profile";
		});
	};

	$scope.editPatient = ()=>{
		$scope.profile.patients[$routeParams.index] = $scope.patient;
		ProfileFactory.updateProfile($scope.profile.id, $scope.profile).then(()=>{
			$scope.patient = $scope.profile.patients[$routeParams.patientIndex];
		});
	};
	$scope.sendPatient = ()=>{
		console.log("sending patient");
		GameFactory.setPatient($scope.patient);
	};









});