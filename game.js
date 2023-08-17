//add sounds
var blue = new Audio("./sounds/blue.mp3");
var green = new Audio("./sounds/green.mp3");
var red = new Audio("./sounds/red.mp3");
var yellow = new Audio("./sounds/yellow.mp3");
var wrong = new Audio("./sounds/wrong.mp3");

// random number generator
function randomNumber(){
    num = Math.floor(Math.random()*4)+1;
    return num;
}
// Function to animate the button
function animateButton(button){
        $('.'+button).addClass('pressed');
    setTimeout(function (){
        $('.'+button).removeClass('pressed');
    },100)
}
// Function to playSound on the buttton click
function playSound(button){
    switch(button){
        case 'blue':
            blue.play();
            break;
        case 'green':
            green.play();
            break;
        case 'red':
            red.play();
            break;
        case 'yellow':
            yellow.play();
            break;
        
    }
}
// computer function
function comp() {
    if (queue.length == levels) {
        $('h1').text("BRAVO!, You've successfully completed all the levels!");
        return;
    } else {
        num = randomNumber();
        queue.push(num);
        for (var i = 0; i < queue.length; i++) {
            (function(index) {
                setTimeout(function() {
                    animateButton(map[queue[index]]);
                    playSound(map[queue[index]]);
                }, (index + 1) * 1000);
            })(i);
        }
    }
}
// To animate when a wrong key is pressed
function animateWrong(){
    $('body').addClass('game-over');
    wrong.play();
    setTimeout(function (){
        $('body').removeClass('game-over');
    },100)
}

    

const map = {1:"blue", 2:"green", 3:"red", 4:"yellow"};
var levels = 20;
var queue = [];
$('.btn').click(function(event){
    var target = event.target.id;
    animateButton(target);
    playSound(target);
    playerInputHandler(target);

})
var currentInputIndex=0
var currentLevel=1
// function to handle the user input
function playerInputHandler(target){
    if (target!=map[queue[currentInputIndex]]){
        animateWrong();
        queue = [];
        currentInputIndex = 0;
        currentLevel = 1;
        gameStarted = false;
        $('h1').text("Game Over, Press any key to restart")
    }else{
        currentInputIndex++;
        if (currentInputIndex === queue.length){
            currentInputIndex = 0;
            currentLevel++;
            $('h1').text('Level '+currentLevel.toString())
            comp();
        }
    }
}

var gameStarted = false; 
$(document).keydown(function (event) {
    if (!gameStarted) { 
        gameStarted = true; 
        $('h1').text('Level 1');
        comp(); 
    }
});