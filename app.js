$(document).ready(function() {
	$(document).keyup(function(e) {
		var key = e.keyCode ? e.keyCode : e.which;
		switch(key) {
			case 65:
				//a: Allston
				getInfo(0);
				break;
			case 66:
				//b: Backbay
				getInfo(1);
				break;
			case 68:
				//d: Dorchester
				getInfo(2);
				break;
			case 69:
				//e: East Boston
				getInfo(3);
				break;
			case 75:
				//k: Fenway/Kenmore
				getInfo(4);
				break;
			case 70:
				//f: Financial District
				getInfo(5);
				break;
			case 74:
				//j: Jamaica Plain
				getInfo(6);
				break;
			case 78:
				//n: North End
				getInfo(7);
				break;
			case 82:
				//r: Roslindale
				getInfo(8);
				break;
			default:
				e.preventDefault();
				break;
		}
	});
});

var regions = {
	0: {name: "Allston", count: 0, clips: ["1Female", "2Male"], map: ""},
	1: {name: "Backbay", count: 0, clips: ["1Female", "3Female", "5Female"], map: ""},
	2: {name: "Dorchester", count: 0, clips: ["2Male", "3Male", "5Female"], map: ""},
	3: {name: "EastBoston", count: 0, clips: ["1Female", "2Male", "3Female"], map: ""},
	4: {name: "FenwayKenmore", count: 0, clips: ["1Female", "2Male", "3Male", "4Male"], map: ""},
	5: {name: "FinancialDistrict", count: 0, clips: ["2Female", "3Male"], map: ""},
	6: {name: "JamaicaPlain", count: 0, clips: ["1Male", "2Female", "3Male"], map: ""},
	7: {name: "NorthEnd", count: 0, clips: ["1Female", "2Female", "3Female", "4Female", "5Male"], map: ""},
	8: {name: "Roslindale", count: 0, clips: ["1Female", "2Female", "4Female"], map: ""}
};

function getInfo(region) {
	playAudio(region);
	showMap(region);
}

function playAudio(region) {
	$("#audioClip").remove();
	var audioElement = "<audio id='audioClip'><source src='audio/"+regions[region].name + regions[region].clips[regions[region].count] + ".m4a' type='audio/mpeg'></audio>";
	$("body").append(audioElement);
	document.getElementById("audioClip").play();	
	regions[region].count  = (regions[region].count + 1) % regions[region].clips.length;
}

function showMap(region) {
	$("#imageMap").remove();	
	$("#regionInfo").remove();	
	var imageElement = "<img id='imageMap' src='images/" + regions[region].map + ".jpg>";
	$("#map").append(imageElement);	
	$("#map").append("<div id='regionInfo'><p><span style='color: green'>" + regions[region].name + "</span> currently has <span style='color: green'>" + regions[region].clips.length + "</span> questions about sustainability and climate change.</p><button id='submit' class='button' onclick='submitQuestion(" + region + ")'>Submit your own question!</button></div>");
}

function submitQuestion(region) {
	var record = "<div id='record'><div id='microphone'><i class='fa fa-microphone fa-lg' aria-hidden='true'></i></div><div id='done'><button class='button' onclick='closeMe()'>Done</button></div></div>";
	$("#regionInfo").append(record);
}

function closeMe() {
	$("#record").remove();
	$("#regionInfo").append("<div id='response'><p>Thank you! Your question has been submitted for review.</p></div>");
	setTimeout(function() {$("#response").remove();}, 3000);
}