let direction={x:0,y:0}
let gameoversound=new Audio("gameover.wav");
let snakebite=new Audio("snakebite.mp3");
let bgmusic=new Audio("bgmusic.wav");
let movesound=new Audio("interface-124464.mp3")
let speed=12;
let score=0;
let lastPaintTime=0;
let snakearr=[{x:13,y:15}]  
food={x:6,y:7}


//game functions
function main(ctime){
    window.requestAnimationFrame(main);
// console.log(ctime)
    if((ctime - lastPaintTime)/1000<1/speed){
    return;
    }
    lastPaintTime=ctime;
    gameEngine();
}
function iscollide(snakearr){
    //if you bump into your self 
    for(let i=1;i<snakearr.length;i++){
        if(snakearr[i].x===snakearr[0].x&&snakearr[i].y===snakearr[0].y){
            return true;
        }
    }
    if(snakearr[0].x>=18||snakearr[0].x<=0||snakearr[0].y>=18||snakearr[0].y<=0){
        return true;
    }
}

function gameEngine(){
    //part1 updating snake variable and food
if(iscollide(snakearr)){
    gameoversound.play();
    bgmusic.pause();
     direction={x:0,y:0}
     alert("gameover press any key to play again ")
     snakearr=[{x:13,y:15}];
     bgmusic.play();
     score=0;

 }
//if u have eaten the food increment the array and generate  the food 
 if(snakearr[0].x===food.x&snakearr[0].y===food.y){
     let a=2;
     let b=16;
     score+=1;
     scorebox.innerHTML="SCORE:" +score;
     snakearr.unshift({x:snakearr[0].x+direction.x,y:snakearr[0].y+direction.y})
     food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
 }
 // moving the snake 
 for(let i=snakearr.length-2;i>=0;i--){
     const element=snakearr[i];
     snakearr[i+1]={...snakearr[i]}
 }
 snakearr[0].y+=direction.y;
snakearr[0].x+=direction.x;
// 
    //part2 display sanke 
    board.innerHTML="";
    snakearr.forEach((e,index)=>{
        snakeElement=document.createElement("div")
        snakeElement.style.gridRowStart=e.y
        snakeElement.style.gridColumnStart=e.x
        if(index===0){
            snakeElement.classList.add("head")    
        }
        else{
            snakeElement.classList.add("snake")

        }
        board.appendChild(snakeElement)
    })
    
        // display the food 
        foodElement=document.createElement("div")
        foodElement.style.gridRowStart=food.y
        foodElement.style.gridColumnStart=food.x
        foodElement.classList.add("food")
        board.appendChild(foodElement)
}

//game logic 
window.requestAnimationFrame(main)
window.addEventListener("keydown" ,e=>{
    direction={x:0,y:1}//starts the game
    movesound.play();
   switch(e.key){
    case "ArrowUp":
        direction.x=0;
        direction.y=-1;
     console.log("ArrowUp")
     break;
     case "ArrowDown":
        direction.x=0;
        direction.y=1;
     console.log("Arrowdown")
     break;
     case "ArrowLeft":
        direction.x=-1;
        direction.y=0;
     console.log("Arrowleft")
     break;
     case "ArrowRight":
        direction.x=1;
        direction.y=0;
     console.log("Arrowright")
     break;
     default:
        break;
   }
})

