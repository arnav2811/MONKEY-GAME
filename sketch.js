// creating globlal variables for the game
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground;
var score = 0,
  time = 0;

function preload() {

  // loading images
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  ground = createSprite(250, 290, 500, 10);
  ground.shade= "lightgreen";

  monkey = createSprite(80, 256);
  monkey.addAnimation("runing", monkey_running);
  monkey.scale = 0.1

  FoodGroup = createGroup();
  obstaclesGroup = createGroup();
}


function draw() {
  createCanvas(500, 300);
  background("lightblue");
  time = time + (frameRate() / 1000)

  if (keyDown("space") && monkey.y >= 140) {
    monkey.velocityY = -10;
  }
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground);
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  myFood();
  barrier();
  if (FoodGroup.isTouching(monkey)) {
    FoodGroup.destroyEach();
    score += 1
  }
  drawSprites();

  text("SURRVIVE TIME:" + time, 360, 20);
  text("SCORE:" + score, 360, 40)
}

// creating a function for food i.e. banana
function myFood() {
  if (frameCount % 80 === 0) {
    banana = createSprite(590, Math.round(random(100, 180)))
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -6;
    banana.lifetime = 120;
    FoodGroup.add(banana);
  }

}

//function for obstacles
function barrier() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(590, 256);
    obstacle.addImage(obstacleImage)
    obstacle.velocityX = -5
    obstacle.scale = 0.2
    obstacle.lifetime = 120;
    obstaclesGroup.add(obstacle);
  }

}