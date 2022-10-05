var timer = document.querySelector(".timer-countdown");
var timeEl = document.querySelector(".time")
var instructions = document.querySelector("#instructions")
var formEl = document.querySelector("form")
var startGameButton = document.querySelector("#start-game")
var game = document.querySelector("#game-window")
var scoreInput = document.querySelector("#score-input")
var correctAns = document.querySelector("#show")
var questionsEl = document.getElementById("questions")
var ansButtons = document.getElementById("answer-button")
var score = document.getElementById("score")
// Create three variables for time storage, shuffling and counter
var timeLeft;
var shuffledQuestions;
var counterd;
var currQuest = 0;
// funtion for shuffling the question using math.random
function shuffle(arr) {
    var result = [];
    var arrCopy = [...arr];
    while (arrCopy.length) {
        result.push(arrCopy.splice(Math.floor(Math.random() * arrCopy.length), 1)[0])
    }
    return result
}
// function to start the game
function startGame() {
    instructions.setAttribute("class", "hide");
    game.classList.remove("hide")
    shuffledQuestions = shuffle(questions);
    console.log(shuffledQuestions)
    timeLeft = 50;
    timer.textContent = `${timeLeft} seconds remaining!`
    counterd = setInterval(function () {
        timeLeft--;
        timer.textContent = `${timeLeft} second(s) remaining!`;
        if (timeLeft <= 0) {
            timeLeft = 0;
            endGame()
        }
    }, 800)
    loadNextQuestion()
}
//funtion to load next question
function loadNextQuestion() {
    //correctAns.setAttribute("class", "hide")
    //ansButtons.setAttribute("class", "")
    //questionsEl.setAttribute("class", "")
    console.log(shuffledQuestions[currQuest])
    var shuffledAns = shuffle(shuffledQuestions[currQuest].answers);
    ansButtons.innerHTML = ""
    questionsEl.textContent = shuffledQuestions[currQuest].question
    shuffledAns.forEach(answer => {
        var newton = document.createElement("button");
        // Button Designing
        newton.style.rotate = 'center'
        newton.style.border = 'dotted';
        newton.style.margin = '15px';
        newton.style.background = 'red'; 
        newton.style.color = 'black'; 
        newton.style.fontSize = '40px'; 
        
        newton.textContent = answer;
        console.log(shuffledQuestions[currQuest].correctAnswer);
        answer === shuffledQuestions[currQuest].correctAnswer ? newton.setAttribute("data-correct", "yes") : null;
        ansButtons.append(newton)
    })
}
// funtion for correct answer
function correctGuess() {
    console.log("correct")
    correctAns.textContent = "correct!"
    correctAns.setAttribute("class", "correct")
    //ansButtons.setAttribute("class", "hide")
    //questionsEl.setAttribute("class", "hide")
    currQuest++;
    if (currQuest < shuffledQuestions.length) {
        setTimeout(loadNextQuestion, 500)
    } else {
        endGame()
    }
}
// function for wrong answer
function wrongGuess() {
    console.log("wrong")
    correctAns.textContent = "wrong!"
    correctAns.setAttribute("class", "wrong")
    //ansButtons.setAttribute("class", "hide")
    //questionsEl.setAttribute("class", "hide")
    currQuest++;
    timeLeft -= 3;
    if (currQuest < shuffledQuestions.length) {
        setTimeout(loadNextQuestion, 500)
    } else {
        endGame()
    }
}
// function for end game
function endGame() {
    clearInterval(counterd)
    // console.log('reached')
    game.setAttribute("class", "hide")
    scoreInput.setAttribute("class", "")
    timer.textContent = ""
    score.textContent = timeLeft;
}

// add event listener on submit of quiz
formEl.addEventListener("submit", function (event) {
    event.preventDefault();
    var currentScores = JSON.parse(localStorage.getItem("TotalScores")) || [];
    console.log(currentScores);
    var me = {
        init: document.querySelector("input").value,
        score: timeLeft
    }
    currentScores.push(me);
    currentScores.sort((a, b) => b.score - a.score)
    localStorage.setItem("TotalScores", JSON.stringify(currentScores));
    console.log(currentScores)
    location.assign("scores.html")
})
// add event listener on start quiz
startGameButton.addEventListener("click", startGame)
ansButtons.addEventListener("click", function (event) {
    console.log(event.target)
    console.log(event.target.matches("button"))
    console.log(event.target.getAttribute("data-correct"))
    if (event.target.matches("button")) {
        event.target.getAttribute("data-correct") ? correctGuess() : wrongGuess()
    }
})






