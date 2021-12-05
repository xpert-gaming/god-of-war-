var bg,bg,jpg;
var player, shooterImg, shooter_shooting;
var zombieImg
var heart1Img,heart2Img,heart3Img
var score=0
var life=3
var gamestate="fight"


function preload(){
  
  shooterImg = loadImage("assets/shooter_1.png")
  shooter_shooting = loadImage("assets/shooter_2.png")
shooter_shooting.scale=1
  bgImg = loadImage("assets/bg.jpg")
zombieImg=loadImage("assets/zombie.png")
heart1Img=loadImage("assets/heart_1.png")
heart2Img=loadImage("assets/heart_2.png")
heart3Img=loadImage("assets/heart_3.png")
burstImg=loadImage("assets/burst.png")
lose=loadSound("assets/lose.mp3")
winning=loadSound("assets/win.mp3")
explosion=loadSound("assets/explosion.mp3")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  
heart1=createSprite(displayWidth-150,40,20,20)
heart1.visible=false
heart1.addImage("heart1",heart1Img)
heart1.scale =0.4


heart2=createSprite(displayWidth-100,40,20,20)
heart2.visible=false
heart2.addImage("heart2",heart2Img)
heart2.scale =0.4

heart3=createSprite(displayWidth-150,40,20,20)
heart3.visible=false
heart3.addImage("heart3",heart3Img)
heart3.scale =0.4

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)
bulletGroup=new Group()
zombieGroup=new Group()
}

function draw() {
  background(0);
  
if(gamestate==="fight"){
  if (life===3){
    heart1.visible=true
    heart2.visible=true
    heart3.visible=true
  }
  if(life===2)
  {
    heart2.visible=true
    heart1.visible=true
    heart3.visible=false
  }
  if(life===1)
{
  heart1.visible=true
  heart2.visible=false
  heart3.visible=false
}
  if(life===0){
    gamestate="lost"

  }

  if(score==100)
  {
    gamestate="won"
    winning.play()
  }
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-30
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
   player.y = player.y+30
  }
  
  
  //release bullets and change the image of shooter to shooting position when space is pressed
  if(keyWentDown("space")){
   bullet=createSprite(displayWidth-1150,player.y-30,20,10)
   bullet.velocityX=20
   bullet.addImage(burstImg)
   bullet.scale=0.2
   bulletGroup.add(bullet)
    player.addImage(shooter_shooting)
   player.scale=0.6
   
  }
  
  //player goes back to original standing image once we stop pressing the space bar
  else if(keyWentUp("space")){
    player.addImage(shooterImg)
    player.scale=0.3
  }
  if(zombieGroup.isTouching(bulletGroup)){
    for(var i=0;i<zombieGroup.length;i++)
    {
      if (zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy()
        bulletGroup.destroyEach()
        explosion.play()
        score=score+2
      }
    }
  }
  if(zombieGroup.isTouching(player))
  {
    for(var i=0;i<zombieGroup.length;i++){
      if(zombieGroup[i].isTouching(player)){
        zombieGroup[i].destroy()
        life=life-1
      }
    }
  }
  enemy()
}




  //moving the player up and down and making the game mobile compatible using touches

drawSprites();
textSize(20)
  fill("white")
  text("score="+score,displayWidth-200,displayHeight/2-250) 

if (gamestate=="lost"){
  heart2.visible=false
    heart1.visible=false
    heart3.visible=false
    lose.play()
    textSize(100)
    fill("red")
    text("YOU LOST",400,400)
    zombieGroup.destroyEach()
    player.destroy()
}
else if(gamestate=="won"){
  textSize(100)
    fill("yellow")
    text("YOU WON",400,400)
    zombieGroup.destroyEach()
    player.destroy()
}
}
function enemy(){
  if (frameCount%50===0)
  {
    zombie=createSprite(random(500,1100),random(100,500),40,40)
    zombie.addImage(zombieImg)
    zombie.scale=0.40
    zombie.velocityX=-(3+6*score/50)
    zombie.debug=true
    zombie.setCollider("rectangle",0,0,400,400)
    zombie.lifetime=400
    zombieGroup.add(zombie)
  }
}

