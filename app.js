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
			case 80:
				//p: play IntroVideo
				if (document.getElementById("introVid") != null) {
					document.getElementById("introVid").load();
					document.getElementById("introVid").play();
				}
				break;
			case 71:
				//g: show general map
				showGeneralMap();
				break;
			default:
				e.preventDefault();
				break;
		}
	});
});

var regions = {
	0: {name: "Allston", count: 0, clips: ["1Female", "2Male"], map: "Allston"},
	1: {name: "Backbay", count: 0, clips: ["1Female", "3Female", "5Female"], map: "BackBay"},
	2: {name: "Dorchester", count: 0, clips: ["2Male", "3Male", "5Female"], map: "Dorchester"},
	3: {name: "EastBoston", count: 0, clips: ["1Female", "2Male", "3Female"], map: "EastBoston"},
	4: {name: "FenwayKenmore", count: 0, clips: ["1Female", "2Male", "3Male", "4Male"], map: "FenwayKenmore"},
	5: {name: "FinancialDistrict", count: 0, clips: ["2Female", "3Male"], map: "FinancialDistrict"},
	6: {name: "JamaicaPlain", count: 0, clips: ["1Male", "2Female", "3Male"], map: "JamaicaPlain"},
	7: {name: "NorthEnd", count: 0, clips: ["1Female", "2Female", "3Female", "4Female", "5Male"], map: "NorthEnd"},
	8: {name: "Roslindale", count: 0, clips: ["1Female", "2Female", "4Female"], map: "Roslindale"}
};

function getInfo(region) {
	playAudio(region);
	showSpecificMap(region);
}

function playAudio(region) {
	$("#audioClip").remove();
	var audioElement = "<audio id='audioClip'><source src='audio/"+regions[region].name + regions[region].clips[regions[region].count] + ".m4a' type='audio/mpeg'></audio>";
	$("body").append(audioElement);
	document.getElementById("audioClip").play();
	regions[region].count  = (regions[region].count + 1) % regions[region].clips.length;
}

function showSpecificMap(region) {
	$("#imageMap").remove();	
	$("#regionInfo").remove();	
	var imageElement = "<div id='imageMap'><img src='images/" + regions[region].map + ".png'></div>";
	$("#map").append(imageElement);	
	$("#map").append("<div id='regionInfo'><p><span style='color: green'>" + regions[region].name + "</span> currently has <span style='color: green'>" + regions[region].clips.length + "</span> questions about sustainability and climate change.</p><button id='submit' class='button' onclick='submitQuestion(" + region + ")'>Submit your own question!</button></div>");
}

function showGeneralMap(region) {
	$("#introVid").remove();
	$("#imageMap").remove();	
	$("#regionInfo").remove();	
	var imageElement = "<div id='imageMap'><img src='images/All.png'></div>";
	$("#map").append(imageElement);	
	$("#map").append("<div id='regionInfo'><p>Click a region in Boston to explore questions about <strong>sustainability</strong> and <strong>climate change</strong>.</p></div>");	
}

function submitQuestion(region) {
	var record = "<div id='record'><div id='microphone'><i class='fa fa-microphone fa-lg' aria-hidden='true'></i></div><div id='done'><button class='button' onclick='closeMe()'>Done</button></div></div>";
	$("#regionInfo").append(record);
	pulse();
}

function pulse() {
	setTimeout(function() {
		$("#microphone i").animate({opacity: .2}, "fast");
		setTimeout(function() {
			$("#microphone i").animate({opacity: 1}, "fast");
			pulse();
		}, 400);
	}, 400);
}

function closeMe() {
	$("#record").remove();
	$("#regionInfo").append("<div id='response'><p>Thank you! Your question has been submitted for review.</p></div>");
	setTimeout(function() {$("#response").remove();}, 3000);
}