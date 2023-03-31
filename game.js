// change text based on screen size
const screenSize = () => {
    
    if (window.innerWidth< 1000) {
        $("#level-title").text("Tap on start button");
        console.log("small");
    } else {
        $("#level-title").text("Press any Key to Start");
        console.log("big");
    }
};
screenSize();
window.addEventListener('resize',screenSize);


let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];

var started = false;
var level = 0;


$(document).on("keydown",function (){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
});

$("#startbtn").on("click", function (){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
        this.style.display="none";
    }
}); 





$(".btn").on("click",function(){
    var userChosenColour = $(this).attr("id"); 
    userClickedPattern.push(userChosenColour);
    
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    console.log(userClickedPattern);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("succes");
    
        if(userClickedPattern.length===gamePattern.length){
        setTimeout(function(){
            nextSequence();
        },1000);
    }
}
    else{
        console.log("wrong");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")},200);
            if(innerWidth<768){
                $("#level-title").text("Game Over,\n Refresh to Restart");
            }
            else{
                $("#level-title").text("Game Over,\n Press Any Key to Restart");
            }
        startOver();
        $("#startbtn").text="RESTART";
        $("#startbtn").style.display="block";
    }
}


function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    console.log(gamePattern);
}



function playSound(name){
    var audio = new Audio("https://github.com/khanshadab1998/simon-game/blob/main/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("."+ currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    }, 100);
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}











