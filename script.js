// Create the canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

//for monster movement
var rightdir = true;

//For hiding the main canvas to show a start menu
canvas.style.visibility="hidden";

document.getElementById("StartButton").onclick=function (){
	canvas.style.visibility="visible";
}

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


// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";



//Audio Loop 
myAudio = new Audio('boss.mp3'); 
if (typeof myAudio.loop == 'boolean')
{
    myAudio.loop = true;
}
else
{
    myAudio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}
myAudio.play();

// Game objects
var hero = {
	speed: 256, // movement in pixels per second
	direction : "down" //will tie to the controls to determine last direction faced to make the sword swing in said direction
};

var sword = {};

var monster = {
	speed: 10
};
var monstersSlain = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Resets the game after the hero object collides with the monster object
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Randomly spawn a monster on the canvas
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

	//Movement for the monster after it spawns
	if(monster.x <= 770 && rightdir){
        monster.x += 4;
      
    }
    else if(monster.x >= 770||!rightdir ){
      rightdir = false;
      monster.x -= 4;
    
      if (monster.x <= 10) rightdir = true;
      
    }



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


	// Scoreboard
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