var ghost, door, tower, climber;
var ghostImage, doorImage, towerImage, climberImage, invisibleBlock;
var gameState = "play";

var doorGr, climberGr, invisibleGr;

var gameSound;

function preload() {
  ghostImage = loadImage("ghost-standing.png");
  doorImage = loadImage("door.png");
  towerImage = loadImage("tower.png");
  climberImage = loadImage("climber.png");
  gameSound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  ghost = createSprite(300, 300);
  doorGr = new Group();
  climberGr = new Group();
  invisibleGr = new Group();
  tower.addImage(towerImage);
  ghost.addImage(ghostImage);
  ghost.scale = 0.35;
  // gameSound.loop();
}

function spawnDoor() {
  if (frameCount % 150 === 0) {
    const x = Math.ceil(random(200, 500));
    const lifetime = 300;
    door = createSprite(x, 0);
    climber = createSprite(x, 50);
    invisibleBlock = createSprite(x, 65, 50, 10);
    invisibleBlock.velocityY = 2;
    invisibleBlock.visible = false;
    invisibleBlock.debug = true;
    door.addImage(doorImage);
    door.velocityY = 2;
    climber.velocityY = 2;
    climber.addImage(climberImage);
    
    doorGr.add(door);
    climberGr.add(climber);
    invisibleGr.add(invisibleBlock);
    
    door.lifetime = lifetime;
    climber.lifetime = lifetime;
    invisibleBlock.lifetime = lifetime;
  }
}

function draw() {
  background(0);
  
  tower.velocityY = 3;
  
  if (gameState === "play") {
    if (tower.y > 400) tower.y = 300;
    

    if (keyDown("space")) ghost.velocityY = -2;
    else ghost.velocityY = 0;
    if (keyDown("left_arrow")) ghost.velocityX = -2;
    else if (keyDown("right_arrow")) ghost.velocityX = 2;
    else ghost.velocityX = 0;
    spawnDoor();
    if (invisibleGr.isTouching(ghost)) {
      gameState = "end";
      ghost.destroy();
      tower.destroy();
      doorGr.destroyEach();
      climberGr.destroyEach();
    }
  } else {
    fill("yellow");
    textSize(30);
    text("Game over", 190, 300);
  }
  
  
  
  drawSprites();
}