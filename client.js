var body = document.getElementsByTagName("body")[0];
var canvas = document.createElement("canvas");
body.appendChild(canvas);
var size = canvasSize();
canvas.height = size[0] * 2;
canvas.width = size[1] * 2;
canvas.style.height = size[0] + "px";
canvas.style.width = size[1] + "px"
var ctx = canvas.getContext("2d");
var socket = io("http://localhost:25565");

var arena;

const cardimgs = [
	[document.getElementById("cfc")]
];

const cardbgs = [
	document.getElementById("bgf0")
];

const classicons = {
	"art": document.getElementById("cicart"),
	"cul": document.getElementById("ciccul"),
	"exp": document.getElementById("cicexp"),
	"mar": document.getElementById("cicmar"),
	"mil": document.getElementById("cicmil"),
	"pio": document.getElementById("cicpio"),
	"pro": document.getElementById("cicpro"),
	"sci": document.getElementById("cicsci"),
	"str": document.getElementById("cicstr"),
	"tec": document.getElementById("cictec")
};

const manaicons = [document.getElementById("micg"), document.getElementById("mice")];
const shicons = [document.getElementById("icstr"), document.getElementById("ichea")];

function canvasSize() {
	if (window.innerHeight * 0.75 <= window.innerWidth) {
		return [window.innerHeight, window.innerHeight * 0.75];
	}
	else {
		return [window.innerWidth / 0.75, window.innerWidth];
	}
}

function drawChampion(card, pos) {
	var img = new Image();
	img.src = "assets/cards/" + card.id + ".svg";
	img.onload = function() {
		ctx.drawImage(img, pos[0], pos[1], canvas.width / 4, canvas.width / 4);
	}
}

function drawHealth(team, pos) {
	ctx.drawImage(shicons[1], pos[0] - canvas.width * 0.04, pos[1] - canvas.width * 0.04, canvas.width * 0.08, canvas.width * 0.08);
	ctx.beginPath();
	ctx.strokeStyle = "#333333";
	ctx.lineWidth = 10;
	ctx.arc(pos[0], pos[1], canvas.width * 0.065, 0.6 * Math.PI, 0.4 * Math.PI, false);
	ctx.stroke();
	
	ctx.beginPath();
	ctx.strokeStyle = "#00ffff";
	ctx.arc(pos[0], pos[1], canvas.width * 0.065, 0.6 * Math.PI, 0.6 * Math.PI + 0.2 * Math.PI * arena.hero[team].blockMeter.segments, false);
	ctx.stroke();
	
	ctx.beginPath();
	ctx.fillStyle = "#333333";
	if (arena.hero[team].blockMeter.blocks > 0) {
		ctx.fillStyle = "#00ffff";
	}
	ctx.arc(pos[0], pos[1] + canvas.width * 0.065, canvas.width * 0.021, 2 * Math.PI, false);
	ctx.fill();
	
	ctx.font = "25px Arial Black";
	ctx.textAlign = "center";
	ctx.fillStyle = "#000000";
	ctx.fillText(arena.hero[team].blockMeter.blocks.toString(), pos[0], pos[1] + canvas.width * 0.0725);
	
	ctx.font = "30px Arial Black";
	ctx.fillText(arena.hero[team].health.toString(), pos[0], pos[1] + canvas.width * 0.01);
}

function drawMana(team, pos) {
	ctx.drawImage(manaicons[team === "past" ? 0 : 1], pos[0] - canvas.width * 0.04, pos[1] - canvas.width * 0.04, canvas.width * 0.08, canvas.width * 0.08);
	ctx.font = "30px Arial Black";
	ctx.textAlign = "center";
	ctx.fillStyle = "#000000";
	ctx.fillText(arena.mana[team].toString(), pos[0], pos[1] + canvas.width * 0.01);
}

function drawCard(card, pos) {
	var img = new Image();
	img.src = "assets/cards/" + card.id + ".svg";
	img.onload = function() {
		ctx.drawImage(img, pos[0], pos[1], canvas.width / 6, canvas.width / 6);
		ctx.drawImage(shicons[0], pos[0] + canvas.width * 0.02, pos[1] + canvas.width * 0.11, canvas.width * 0.05, canvas.width * 0.05);
		ctx.drawImage(shicons[1], pos[0] + canvas.width * (1 / 6 - 0.07), pos[1] + canvas.width * 0.11, canvas.width * 0.05, canvas.width * 0.05);
		ctx.font = "25px Arial Black";
		ctx.textAlign = "center";
		ctx.fillStyle = "#000000";
		ctx.fillText(card.strength.toString(), pos[0] + canvas.width * 0.045, pos[1] + canvas.width * 0.145);
		ctx.fillText(card.health.toString(), pos[0] + canvas.width * (1 / 6 - 0.045), pos[1] + canvas.width * 0.145);
	}
}

function drawHandCard(card, pos) {
	var img = new Image();
	img.src = "assets/cards/" + card.id + ".svg";
	img.onload = function() {
		ctx.drawImage(cardbgs[card.set], pos[0], pos[1], canvas.width / 9, canvas.width / 9);
		ctx.drawImage(img, pos[0], pos[1], canvas.width / 9, canvas.width / 9);
		ctx.drawImage(cardimgs[card.type][card.rarity], pos[0], pos[1], canvas.width / 9, canvas.width / 9);
		ctx.drawImage(manaicons[card.team], pos[0] + canvas.width * 0.002, pos[1] + canvas.width * 0.002, canvas.width * 0.04, canvas.width * 0.04);
		ctx.drawImage(shicons[0], pos[0] + canvas.width * 0.004, pos[1] + canvas.width * 0.07, canvas.width * 0.04, canvas.width * 0.04);
		ctx.drawImage(shicons[1], pos[0] + canvas.width * (1 / 9 - 0.044), pos[1] + canvas.width * 0.07, canvas.width * 0.04, canvas.width * 0.04);
		ctx.font = "20px Arial Black";
		ctx.textAlign = "center";
		ctx.fillStyle = "#000000";
		ctx.strokeStyle = "#000000";
		ctx.fillText(card.cost.toString(), pos[0] + canvas.width * 0.022, pos[1] + canvas.width * 0.028);
		ctx.fillText(card.strength.toString(), pos[0] + canvas.width * 0.024, pos[1] + canvas.width * 0.095);
		ctx.fillText(card.health.toString(), pos[0] + canvas.width * (1 / 9 - 0.024), pos[1] + canvas.width * 0.095);
	}
}

function drawArena(team) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var otherTeam = "future";
	if (team === "future") {
		otherTeam = "past";
	}
	drawChampion(arena.hero[otherTeam], [canvas.width * (3 / 8), 0]);
	for (var i = 0; i < 6; i ++) {
		if (arena.board[otherTeam][i]) {
			drawCard(arena.board[otherTeam][i], [canvas.width * (i / 6), canvas.height * (5 / 24)]);
		}
		if (arena.barrier[otherTeam][i]) {
			drawCard(arena.board[otherTeam][i], [canvas.width * (i / 6), canvas.height / 3]);
		}
		if (arena.barrier[team][i]) {
			drawCard(arena.board[team][i], [canvas.width * (i / 6), canvas.height * (11 / 24)]);
		}
		if (arena.board[team][i]) {
			drawCard(arena.board[team][i], [canvas.width * (i / 6), canvas.height * (7 / 12)]);
		}
	}
	drawChampion(arena.hero[team], [canvas.width * (3 / 8), canvas.height * (17 / 24)]);
	for (var i = 0; i < arena.hand[team].length; i ++) {
		drawHandCard(arena.hand[team][i], [canvas.width / 2 - arena.hand[team].length * (canvas.width / 16) + i * (canvas.width / 8) + canvas.width / 144, canvas.height * (11 / 12)]);
	}
	drawCard(arena.lastEventCard, [canvas.width * (5 / 6), canvas.height / 12]);
	drawHealth(otherTeam, [canvas.width * 0.675, canvas.width / 8]);
	drawHealth(team, [canvas.width * 0.325, canvas.height * (17 / 24) + canvas.width / 8]);
	drawMana(otherTeam, [canvas.width * 0.8, canvas.width * 0.05]);
	drawMana(team, [canvas.width * 0.2, canvas.height * (17 / 24) + canvas.width * 0.05]);
}

var testCard = {id: 0, type: 0, rarity: 0, set: 0, strength: 4, health: 2, classes: ["mar"], team: 0, cost: 8, blockMeter: {segments: 3, blocks: 1}}; // todelete

arena = {
	hero: {
		past: testCard,
		future: testCard
	},
	board: {
		past: [testCard, testCard, testCard, testCard, testCard, testCard],
		future: [testCard, testCard, testCard, testCard, testCard, testCard]
	},
	barrier: {
		past: [testCard, testCard, testCard, testCard, testCard, testCard],
		future: [testCard, testCard, testCard, testCard, testCard, testCard]
	},
	hand: {
		past: [testCard, testCard, testCard, testCard, testCard, testCard, testCard, testCard],
		future: 3
	},
	mana: {
		past: 10,
		future: 6
	},
	lastEventCard: testCard
};

drawArena("past");