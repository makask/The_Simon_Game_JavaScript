let colors = ["green", "red", "yellow", "blue"];
let level = 1;
let computerPattern = [];
let playerPattern = [];
let computersColor = "";
let playersColor = "";


$(document).keypress(function(event){
     computersTurn();
    $(".btn").click(function(event){       
        game(event.target.id);
    });
    $(document).unbind("keypress");
});


function getRandomColor(colors){
    let randomNumber = Math.floor(Math.random() * 4);
    return colors[randomNumber];
}

function computersTurn(){
    computersColor = getRandomColor(colors);
    computerPattern.push(computersColor);
    $("#level-title").text("Level " + level);
    $("." + computersColor).fadeOut("fast");
    setTimeout(() => {
        $("." + computersColor).fadeIn("fast");  
    }, 5);
    var audio = new Audio("./sounds/" + computersColor + ".mp3");
    audio.play();
}

function playersTurn(color){
    $("." + color).addClass("pressed");
    setTimeout(()=>{
        $("." + color).removeClass("pressed");
    }, 100);
    var audio = new Audio("./sounds/" + color + ".mp3");
    audio.play();
    playerPattern.push(color);
}

function patternsMatch()
{   
    if(computerPattern.length != playerPattern.length){
        return false;
    }else{

        let result = false;

        for(let i = 0; i < computerPattern.length; i++){
            if(computerPattern[i] !== playerPattern[i]){
                return false;
            }else{
                result = true;
            }
        }
        return result;
    }
}

function elementsMatch(){
    let result = false;
    for(let i = 0; i < playerPattern.length; i++){
        if(playerPattern[i] !== computerPattern[i]){
            return false;
        }else{
            result = true;
        }
    }
    return result;
}


function game(color){

    if(playerPattern.length !== computerPattern.length){
        playersTurn(color);
        console.log(playerPattern);
        if(!elementsMatch()){
            gameOver();   
        }
    }
    
    if(patternsMatch()){
        computersTurn();
        playerPattern = [];
        nextLevel();
    }
}

function nextLevel(){
    level++;
    $("#level-title").text("Level " + level);
}

function gameOver(){
    $("body").addClass("game-over");
    setTimeout(()=>{
        $("body").removeClass("game-over");
    }, 200);
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    $("#level-title").text("Game Over, Press Any Key to Restart");
    level = 1;
    computerPattern = [];
    playerPattern = [];
    $(".btn").unbind("click");

    $(document).keypress(function(event){
        computersTurn();
       $(".btn").click(function(event){       
           game(event.target.id);
       });
       $(document).unbind("keypress");
   }); 
}

