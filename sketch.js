var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3;
}

function draw() {
  background(200);
  
  if (gameState === "play"){
    if (keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    if (keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    if (keyDown("space")){
      ghost.velocityY = -10;
    }

    ghost.velocityY =   ghost.velocityY + 0.8

  if(tower.y > 400){
      tower.y = 300
    }

SpawnDoors();

    if (climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }

    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState="end";
    }
    drawSprites();
  }

if (gameState === "end"){
  text("Game Over", 200,200);
  textSize(30);
  stroke("white");
  fill("cyan");
}
}

function SpawnDoors(){

  if (frameCount % 240 === 0) {
    var door = createSprite(200,-50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.height = 2;
    invisibleBlock.width = climber.width;

    door.addImage(doorImg);
    climber.addImage(climberImg);
  
    door.x = Math.round(random(120,400));
    invisibleBlock.x = door.x;
    climber.x = door.x;

    ghost.depth = door.depth;
    ghost.depth += 1;
    
    door.velocityY = 1;
    climber.velocityY = 1;
   invisibleBlock.velocityY = 1;

   door.lifetime = 800;
   climber.lifetime = 800;
   invisibleBlock.lifetime = 800;

   doorsGroup.add(door);
   climbersGroup.add(climber);
   invisibleBlockGroup.add(invisibleBlock);
   invisibleBlock.debug = true;
  }
}