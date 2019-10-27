var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var gameStarted = false;

var level = 0;

//keydown eventListner. It only listen to first key press at the start of each game.
$(document).on("keydown",function(){
  if(gameStarted==false){
    gameStarted=true;
    nextSequence();
  }
});

//click eventListner. It listen to click on buttons.
$(".btn").on("click",function(event){
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animationPress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

//Checks userClickedPattern with gamePattern
function checkAnswer(currentIdx){
  if((currentIdx<=gamePattern.length-1)&&(userClickedPattern[currentIdx]==gamePattern[currentIdx])){
    //If whole gamePattern is checked with userClickedPattern
    if(userClickedPattern.length == gamePattern.length){
      setTimeout(function(){
        //calling nextSequence function once current level is passed
        nextSequence();
      }, 1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    //calling startOver to reset the game
    startOver();
  }
}

function nextSequence(){
  //reseting userClickedPattern to empty array so that new sequence that the user will enter can be checked with gamePattern
  userClickedPattern=[];
  //upgrading the level
  level++;
  $("#level-title").text("level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  animationPress(randomChosenColour);
  playSound(randomChosenColour);
}

//startOver function to reset level, gamePattern, gameStarted
function startOver(){
  level=0;
  gamePattern=[];
  gameStarted=false;
}

//playSound function to play sound of given color
function playSound(colour){
  var audio = new Audio("sounds/" + colour + ".mp3");
  audio.play();
}

//function to add animation to buttons
function animationPress(colour){
  $("#" + colour).fadeIn(100).fadeOut(100).fadeIn(100);
  $("#" + colour).addClass("pressed");
  setTimeout(function () {
    $("#" + colour).removeClass("pressed");
  }, 100);
}
