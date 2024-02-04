//board
let board;
let boardWidth=400;
let boardHeight=640;
let ctx;

//bird
let birdWidth=34;
let birdHeight=24;
let birdY=boardHeight/2;
let birdX=boardWidth/8;
let birdImg;

//object bana rha hu bird naam ka jsime bird ki details hain upar waali
let bird={
    x:birdX,
    y:birdY,
    height:birdHeight,
    width:birdWidth
}

//pipes
let pipeArray=[];
let pipeWidth=64;
let pipeHeight=512;
let pipeX=boardWidth;
let pipeY=0;
let gameOver=false;

let topPipeImg;
let bottomPipeImg;

//physics
let velocityX=-2;//pipes moving left speed
let velocityY=0;
let gravity=0.25;
let score=0;


window.onload=function(){
     board = document.getElementById("board");
    board.width=boardWidth;
    board.height=boardHeight;
    ctx = board.getContext("2d");
//  document.body.appendChild(btn1);
//  document.body.appendChild(btn2);
 
//load images
birdImg=new Image();
birdImg.src="./flappybird.png";
birdImg.onload=function(){ctx.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height);}

topPipeImg=new Image();
topPipeImg.src="./toppipe.png";
bottomPipeImg=new Image();
bottomPipeImg.src="./bottompipe.png";


requestAnimationFrame(update);
setInterval(placePipes,1400);
document.addEventListener('keydown',moveBird);

}
function update(){
    requestAnimationFrame(update);
    if(gameOver){
        return;
    }
    ctx.clearRect(0,0,board.width,board.height);
    velocityY+=gravity;
    bird.y=Math.max(bird.y+velocityY,0);
    ctx.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height);
    if(bird.y>board.height){
        gameOver=true;
        if(gameOver){
            ctx.strokeText("GAME OVER",5,90);
           }
    }
    
    //pipes
    for(let i=0;i<pipeArray.length;i++){
        let pipe=pipeArray[i]; 
        pipe.x+=velocityX;
        ctx.drawImage(pipe.img,pipe.x,pipe.y,pipe.width,pipe.height);
       if(!pipe.passed && bird.x>pipe.x+pipe.width){
        score+=1/2;
        pipe.passed=true;
       }
        if(detectCollision(bird,pipe)){
            gameOver=true;   
           }
           ctx.fillStyle="white";
           ctx.font="50px sans-serif";
           ctx.strokeText(score,5,50);
           if(gameOver){
            ctx.strokeText("GAME OVER",5,90);
           }
    }
    while(pipeArray.length>0 && pipeArray[0].x<0-pipe.width){
        pipeArray.shift();
    }
}
function placePipes(){
    if(gameOver){
        return;
    }
    let randomPipeY=pipeY-pipeHeight/4-Math.random()*(pipeHeight/2);
   let openingSpace=boardHeight/4;
    let topPipe={
        img:topPipeImg,
        x:pipeX,
        y:randomPipeY,
        width:pipeWidth,
        height:pipeHeight,
        passed:false
    }
    pipeArray.push(topPipe);
    let bottomPipe={
        img:bottomPipeImg,
        x:pipeX,
        y:randomPipeY+pipeHeight+openingSpace,
        passed:false,
        width:pipeWidth,
        height:pipeHeight

    }
    pipeArray.push(bottomPipe);
    

}
function moveBird(e){
    if(e.code=="Space"|| e.code=="ArrowUp" ||e.key=="s"){
        velocityY=-6;
    }
    if(gameOver){
        pipeArray=[];
        bird.y=birdY;
        score=0;
        gameOver=false;
    }
}
function detectCollision(a,b){
    return a.x<b.x+b.width && a.x+a.width>b.x
    && a.y<b.y+b.height && a.y+a.height>b.y;
}