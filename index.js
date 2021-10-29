
var gamePattern = [];

var buttonColours = ['red', 'yellow', 'blue', 'green']

var userClickedPattern = [];

var level = 0;

var started = false;


function nextSequence(){

  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  level ++

  $('#level-title').html('Level '+ level)

  started = true;
}

function playSound(name){
  var audio = new Audio('sounds/'+name+'.mp3');
  audio.play();
}

function animatePress(currentColour){

  $('.'+currentColour).addClass('pressed');

  setTimeout(function(){
    $('.'+currentColour).removeClass('pressed');
  }, 100);
}


$(document).keypress(function(event){
  if (event.key === 'a'){
    if (started === false){
      $('#level-title').html('Level 0');
      nextSequence();}
  }
})

$('.btn').click(function(){
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if (gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(function(){
      $('body').removeClass('game-over');
    }, 200);
    $('#level-title').html('Game Over, Press A key to Restart');
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
