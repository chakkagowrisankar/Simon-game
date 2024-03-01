var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

document.body.addEventListener("keypress", (e) => {
    if (!started) {
        document.getElementById("level-title").innerText = `Level ${level}`;
        nextSequence();
        started = true;
    }
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    document.getElementById("level-title").innerText = `Level ${level}`;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    var element = document.getElementById(randomChosenColour);
    element.classList.add("press");
    setTimeout(function () {
        element.classList.remove("press");
        element.style.backgroundColor = `${randomChosenColour}`;
    }, 500);
    playSound(randomChosenColour);
}

function clickAnswer(color) {
    if (started) {
        console.log(color);
        userClickedPattern.push(color);
        playSound(color);
        animatePress(color);
        checkAnswer(userClickedPattern.length - 1);
    }
    document.getElementById(color).classList.add("pres");
    setTimeout(function () {
        document.getElementById(color).classList.remove("pres");
        document.getElementById(color).style.backgroundColor = `${randomChosenColour}`;
    }, 500);
}

function animatePress(currentColor) {
    var element = document.getElementById(currentColor);
    element.classList.add("pressed");
    setTimeout(function () {
        element.classList.remove("pressed");
    }, 200);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        document.body.classList.add("game-over");
        document.getElementById("level-title").innerText = `Game Over your level is ${level-1}, Press Any Key to Restart`;
        setTimeout(function () {
            document.body.classList.remove("game-over");
        }, 500);
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
