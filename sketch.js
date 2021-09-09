//Create variables here
var dog, dogImg, happyDogImg, database, foodS, foodStock; 
var food;  
var addFood, feed; 
var fedTime, lastFed; 
var readState, gameState; 
var gardenImg, bedroomImg, washroomImg;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png"); 

  gardenImg = loadImage("images/Garden.png"); 
  bedroomImg = loadImage("images/BedRoom.png"); 
  washroomImg = loadImage("images/Wash Room.png");
}

function setup() {
  createCanvas(500, 800);
  
  dog = createSprite(258,700,10,60);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  
  
  
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  
  food = new Food();
 
  addFood = createButton("Add Food"); 
  addFood.position(500,70);  
  addFood.mousePressed(AddFood);

  feed = createButton("Feed Food"); 
  feed.position(600,70);
  feed.mousePressed(FeedFood);

  readState = database.ref("gameState"); 
  readState.on("value",function(data){ 
    gameState = data.val();
  });

currentTime = hour();

}


function draw() {  
  background("green");
  
    fedTime = database.ref("FeedTime"); 
    fedTime.on("value",function (data){ 
      lastFed = data.val();
    }); 
    
    fill("black"); 
    textSize(30); 
    textFont(BOLD); 
    text("last Feed Time:"+ lastFed,100,80); 

   if(gameState != "Hungry"){ 
     addFood.hide(); 
     feed.hide(); 
   }
   else{ 
     addFood.show(); 
     feed.show(); 
     food.display();
    drawSprites();
   }

   if(currentTime == lastFed + 1){ 
     food.garden(); 
     updateState("playing"); 
   }
   else if(currentTime == lastFed + 2){ 
     food.bedroom(); 
     updateState("sleeping");
   }
   else if(currentTime >= lastFed + 3 && currentTime <= lastFed + 4){ 
     food.washroom(); 
     updateState("bathing");
   }
   else{ 
     updateState("Hungry");
   }

  
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref("/").update({
    Food:x
  });
}

function readStock(data){
  foodS = data.val(); 
  food.updateFood(foodS)
}


function AddFood(){ 
  
  dog.addImage(dogImg);
  foodS++; 
database.ref("/").update({ 
  Food:foodS,
}); 
  
}


function FeedFood(){ 
if(foodS > 0){
  foodS++; 
dog.addImage(happyDogImg); 

database.ref("/").update({ 
  Food:foodS, 
  FeedTime:hour()
});
 }
}

function updateState(state){ 
  database.ref('/').update({ 
    gameState:state
  });
}
















