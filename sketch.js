var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0

function preload(){
  swordImage=loadImage("sword.png")
  monster_moving=loadAnimation("alien1.png","alien2.png")
  fruit1=loadImage("fruit1.png")
   fruit2=loadImage("fruit2.png")
   fruit3=loadImage("fruit3.png")
   fruit4=loadImage("fruit4.png")
  gameOverImage=loadImage("gameover.png")
  knifeSwooshSound=loadSound("knifeSwooshSound.mp3")
  gameoverSound=loadSound("gameover.mp3")
}

function setup(){
  createCanvas(400,400)
  sword=createSprite(200,200,10,30)
  sword.addImage(swordImage)
  sword.scale=0.6
  
  fruitGroup=createGroup()
  EnemyGroup=createGroup()
  
  gameOver=createSprite(200,200,20,20)
  gameOver.addImage(gameOverImage)
  gameOver.scale=0.75
  
}

function draw(){
background("white")
  
  text("Score:"+score,200,50)
  
  
  if(gameState === PLAY){
  Enemy()
  fruit()
    
    sword.y=World.mouseY
  sword.x=World.mouseX
  gameOver.visible=false
    
  if(EnemyGroup.isTouching(sword)){
        gameState = END;
    }
  }
  if(gameState===END){
    score=0
    fruitGroup.setLifetimeEach(-1)
          EnemyGroup.setLifetimeEach(-1)
     sword.x=200
    sword.y=200
    gameOver.visible=true
    sword.visible=false
    
    
    
  }
  
  if(sword.isTouching(EnemyGroup)){
    
    gameState=END
    fruitGroup.destroyEach()
    EnemyGroup.destroyEach()
    gameoverSound.play()
    
    
  }
  
  if(sword.isTouching(fruitGroup)){
    
    score=score+1
    fruitGroup.destroyEach()
    knifeSwooshSound.play()
    
  }
    
    
  
  
  drawSprites()
  
  
}

function Enemy(){
   
  if(World.frameCount%150===0){
    var monster=createSprite(400,400,30,10)
  monster.velocityX=-(5+(score/10))
     monster.y=Math.round(random(50,400))
    monster.addAnimation("moving",monster_moving)
    EnemyGroup.add(monster)
     }
}

function fruit(){
  
  if(World.frameCount%75===0){
  var fruit=createSprite(400,200,19,76)
 r=Math.round(random(1,4))
  if (r==1){
    fruit.addImage(fruit1)
     } else if (r==2){
    fruit.addImage(fruit2)
     } else if (r==3){
    fruit.addImage(fruit3)
     } else {
    fruit.addImage(fruit4)
     } 
    fruit.setLifetime=100
  fruit.y=Math.round(random(100,350))
  fruit.scale=0.15
  fruit.velocityX=-(5+(score/10))
    fruitGroup.add(fruit)
    
  
  }
}
