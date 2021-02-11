var playerrun, playerpower, player, playerstand;
var ground;
var score;
var coin, coinImage;
var gameState = "play";

function preload(){
  playerrun = loadAnimation("images/run/p1.png","images/run/p2.png");
  playerpower = loadAnimation("images/power/p7.png", "images/power/p8.png", "images/power/p9.png", "images/power/p10.png");
  playerstand = loadImage("images/run/p1.png");
  bg = loadImage("images/bground1.png");
  obstacle1 = loadAnimation("images/obstacles/tile000.png","images/obstacles/tile001.png","images/obstacles/tile002.png","images/obstacles/tile003.png" );
  obstacleIMG = loadAnimation("images/obstacle2/ob21.png","images/obstacle2/ob22.png","images/obstacle2/ob23.png","images/obstacle2/ob24.png")
  g = loadImage("images/ground.png");
  coinImage = loadImage("images/coins/coins.png");
  bg2 = loadImage("images/bground2.jpg");
}

function setup(){
createCanvas(windowWidth,windowHeight);

bground = createSprite(windowWidth - 300, windowHeight - 200);
bground.addImage("bground",bg);
bground.addImage("bground2",bg2)
bground.velocityX = -3;

player = createSprite(600,300,10,10);
player.addImage("stand",playerstand);
player.scale = 3;
player.addAnimation("run",playerrun);
player.addAnimation("power",playerpower);
player.debug = false;
player.setCollider("rectangle", 0, 0,25,30);

obstaclesGroup = new Group();
coinsGroup = new Group();
obstacle2Group = new Group();

score = 0;

ground = createSprite(200,550,windowWidth*2,60);
ground.addImage("ground",g);
ground.scale = 0.3;
ground.debug = false;
ground.setCollider("rectangle",0,0,10000,300);
ground2 = createSprite(870,550,windowWidth*2,60);
ground2.addImage("ground",g);
ground2.scale = 0.3;
}

function draw(){
  background("white");

  player.collide(ground);
  if(gameState === "play"){
    if(bground.x <= 200){
      bground.x = windowWidth/2;
    }

    //changing background
    if(score >= 2){
      bground.changeImage("bground2");

    }

    //make player fly, gravity brings down
    if(keyDown(UP_ARROW)){
      player.velocityY = -10;
      player.changeAnimation("run",playerrun);
    }
    
    player.velocityY = player.velocityY + 0.8;

    if(obstaclesGroup.isTouching(player)){
      gameState = "end";
    }
    if(obstacle2Group.isTouching(player)){
      gameState = "end";
    }
    if(coinsGroup.isTouching(player)){ 
      coinsGroup.destroyEach(); 
      score = score + 1; 
    }

    //call functions to spawn obstacles & coins
    spawnObstacles();
    spawnObstacle2();
    spawnCoins();
  }
  
  else if(gameState === "end"){
    bground.velocityX = 0;
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    obstacle2Group.setVelocityXEach(0);
    coinsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    obstacle2Group.setLifetimeEach(-1);
    coinsGroup.setLifetimeEach(-1);
  }
  drawSprites();
  textSize(20);
  fill("Black");
  text("Score: "+ score, 1100,50);

}

function spawnObstacles() {
  if(frameCount % 150 === 0) {
    var obstacle = createSprite(windowWidth + 50,475,20,20);
    obstacle.velocityX = -(6 + 3*score/100);
    obstacle.addAnimation("ob1",obstacle1);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.8;
    obstacle.lifetime = 300;

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnObstacle2(){
  if(frameCount % 90 === 0) {
    var obstacle2 = createSprite(windowWidth + 1000,30,50,60);
    obstacle2.velocityX = -(6 + 3*score/100);
    obstacle2.addAnimation("ob2",obstacleIMG);
    
    //assign scale and lifetime to the obstacle           
    obstacle2.scale = 0.8;
    obstacle2.lifetime = 500;

    //add each obstacle to the group
    obstacle2Group.add(obstacle2);
  }
}

function spawnCoins() {
  if(frameCount % 100 === 0) {
    var coins = createSprite(windowWidth + 50,105,20,20);
    coins.velocityX = -(6 + 3*score/100);
    coins.addImage(coinImage);
    
    coins.y = Math.round(random(50,300));
    //coins.addImage("c",coin);
    //coins.position(20,20,10,10)
    coins.scale = 0.25;

    coins.lifetime = 300;

    //console.log(coins.depth);
    player.depth = coins.depth;
    console.log(player.depth);


    //add each obstacle to the group
    coinsGroup.add(coins);
    
    if(coins.isTouching(player)){
      score = score + 1;
      coins.remove();
    }
    
  }
}

//function reset(){
  //gameState = PLAY;
  //ground.velocityX = -(6 + 3*score/100);
  //restart.visible = false;
  
  //obstaclesGroup.destroyEach();
  //coinsGroup.destroyEach();
  
  //score = 0;
//}