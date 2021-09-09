class Food{ 

constructor(){ 

this.image= loadImage("images/Milk.png"); 
this.foodStock=0;


}


getFoodStock(){ 
return this.foodStock;
}

updateFood(foodStock){ 
    this.foodStock = foodStock;
}

garden(){ 
    background(gardenImg,500,800); 
}

bedroom(){ 
    background(bedroomImg,500,800); 
}

washroom(){ 
    background(washroomImg,500,400)
}







display(){ 
var x = 80; 
var y = 100;

imageMode(CENTER); 
image(this.image,150,700,70,70); 

if(this.foodStock !==0){ 
for(var i=0; i<this.foodStack;i++){ 
    if(i % 12 == 0){ 
x - 80; 
y=y+50;
    }
    image(this.image,x,y,50,50); 
    x = x + 50;
}
}





}









}