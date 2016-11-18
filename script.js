// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// Sword image
var swordReady = false;
var swordImage = new Image();
swordImage.onload = function () {
	swordReady = true;
};
swordImage.src = "images/sworddown.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Game objects
var hero = {
	speed: 256, // movement in pixels per second
	direction : "down" //will tie to the controls to determine last direction faced to make the sword swing in said direction
};

var sword = {};

var monster = {};
var monstersSlain = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown && hero.y > 0) { // Player holding up
		hero.y -= hero.speed * modifier;
		hero.direction = "up";
		heroImage.src = "images/heroup.png";
	}
	if (40 in keysDown && hero.y < (canvas.height - 45)) { // Player holding down
		hero.y += hero.speed * modifier;
		hero.direction = "down";
		heroImage.src = "images/herodown.png";
	}
	if (37 in keysDown && hero.x > 0) { // Player holding left
		hero.x -= hero.speed * modifier;
		hero.direction = "left";
		heroImage.src = "images/heroleft.png";
	}
	if (39 in keysDown && hero.x < (canvas.width - 45)) { // Player holding right
		hero.x += hero.speed * modifier;
		hero.direction = "right";
		heroImage.src = "images/heroright.png";
	}


//Spacebar to execute swordswing based on last directional key pressed	
/*
	if (32 in keysDown && hero.direction = "up") {

	}
	if else (32 in keysDown && hero.direction = "down") {

	}
	if else (32 in keysDown && hero.direction = "left") {

	}
	if else (32 in keysDown && hero.direction = "right"){

	}
*/

	// Are they touching?
	if (
		hero.x <= (monster.x + 32) 
		&& monster.x <= (hero.x + 32) 
		&& hero.y <= (monster.y + 32) 
		&& monster.y <= (hero.y + 32)
	) 
	
	{
		++monstersSlain;
		reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Monsters slain: " + monstersSlain, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	
	update(delta / 1000);
	render(); 

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();