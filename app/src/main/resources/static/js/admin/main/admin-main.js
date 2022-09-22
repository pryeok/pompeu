var memT = document.getElementById("member-total");
var memC = document.getElementById("member-creator");
var memR = document.getElementById("member-rookie");



   fetch("/adminMain/memberStatus")
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {

				memT.innerHTML = result.ammTotal + "명";
				memC.innerHTML = result.ammCreator + "명";
				memR.innerHTML = result.ammRookie + "명";

    });

var lecT = document.getElementById("lecture-total");
var lecI = document.getElementById("lecture-ing");
var lecS = document.getElementById("lecture-stnby");


   fetch("/adminMain/lectureStatus")
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {

				lecT.innerHTML = result.amlTotal + "개";
				lecI.innerHTML = result.amlIng + "개";
				lecS.innerHTML = result.amlStnby + "개";

    });

var undoA = document.getElementById("undo-apply");
var undoC = document.getElementById("undo-claim");

   fetch("/adminMain/undoStatus")
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {

				undoA.innerHTML = result[0].amuApply + "개";
				undoC.innerHTML = result[1].amuClaim + "개";

    });