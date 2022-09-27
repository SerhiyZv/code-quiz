
//Variables declaration
var clickStart = document.getElementById("start-button");
var timerEl = document.getElementById("countdown");
var timeLeft = 60;
var quizDuration;
var questionContainer = document.querySelector("#quiz-container");
//Questions and answers array
var questions = [{
    q: "Commonly used data types DO NOT include:",
    a: "1. Strings",
    b: "2. Booleans",
    c: "3. Alerts",
    d: "4. Numbers",
    correct: "3. Alerts",
},
{
    q: "How to write an IF statement in JavaScript?",
    a: "1. if i == 5 then",
    b: "2. if (i == 5)",
    c: "3. if i = 5 then",
    d: "4. if i = 5",
    correct: "2. if (i == 5)",
},
{
    q: "How does a FOR loop start?",
    a: "1. for (i = 0; i &lt;= 5; i++)",
    b: "2. for (i = 0; i &lt;= 5)",
    c: "3. for i = 1 to 5",
    d: "4. for (i &lt;= 5; i++)",
    correct: "1. for (i = 0; i &lt;= 5; i++)",    
},
{
    q: "Arrays in JavaScript can be used to store ____.",
    a: "1. Numbers and strings",
    b: "2. Other arrays",
    c: "3. Booleans",
    d: "4. All of the above",
    correct: "4. All of the above",  
},
{
    q: "What is the correct syntax for referring to an external script called 'code.js'?",
    a: "1. <script src='code.js'>",
    b: "2. <script href='code.js'>",
    c: "3. <script ref='code.js'>",
    d: "4. <script name='code.js'>",
    correct: "1. <script src='code.js'>",    
}];


// Add timer Function
function timer() {
    timerEl.textContent = "Time remaining: " + timeLeft + "s";
    quizDuration = setInterval(function () {
        if (timeLeft > 0) {
            adjustTime(-1);
        } else {
            endQuizPage();
        }
    }, 1000);
}
function adjustTime(amount) {
    timeLeft += amount;
    if (timeLeft < 0) {
        timeLeft = 0;
    }
    timerEl.textContent = "Time remaining: " + timeLeft + "s";
}

clickStart.onclick = timer;
//Render Questions and create elements for questions and answers
var renderQuestion = function (question) {
    questionContainer.innerHTML = "";

    var questionHeader = document.createElement("h2");
    questionHeader.textContent = question.q;

    var answerA = document.createElement("button");
    answerA.textContent = question.a;
    answerA.addEventListener("click", answerClick);

    var answerB = document.createElement("button");
    answerB.textContent = question.b;
    answerB.addEventListener("click", answerClick);

    var answerC = document.createElement("button");
    answerC.textContent = question.c;
    answerC.addEventListener("click", answerClick);

    var answerD = document.createElement("button");
    answerD.textContent = question.d;
    answerD.addEventListener("click", answerClick);

    questionContainer.appendChild(questionHeader);
    questionContainer.appendChild(answerA);
    questionContainer.appendChild(answerB);
    questionContainer.appendChild(answerC);
    questionContainer.appendChild(answerD);
}

var currentQuestionIndex = 0;
var userScore = 0;
var correctAnswer = questions[currentQuestionIndex].correct;
var clickViewScores = document.getElementById("view-score");

var answerClick = function(event) {
    event.preventDefault();
    var userAnswer = event.target.textContent;
    correctAnswer = questions[currentQuestionIndex].correct;

    // Determination of correct and wrong answers
    var answerDetermination = document.querySelector("#answer-determination");
    if (userAnswer !== correctAnswer) {
        adjustTime(-10);
        answerDetermination.textContent = "Wrong!";
        currentQuestionIndex++;
        if (currentQuestionIndex >= questions.length) {
            endQuizPage();
        } else {renderQuestion(questions[currentQuestionIndex])};

    }
    else if (userAnswer === correctAnswer) {
        currentQuestionIndex++;
        answerDetermination.textContent = "Correct!";
        userScore++;
        if (currentQuestionIndex >= questions.length) {
            endQuizPage();
        } else {renderQuestion(questions[currentQuestionIndex])};
    }
};

// Render questions
var quiz = function (event) {
    event.preventDefault();
    resetDisplay();
    renderQuestion(questions[currentQuestionIndex]);
};

// Reset Display function and get the score
function resetDisplay() {
    questionContainer.innerHTML="";
    document.querySelector("#welcome").style.display = "none";
}
function highScores() {
    let data = localStorage.getItem("object");
    let getData = JSON.parse(data);
    let name = getData.name;
    let score = getData.score;
    questionContainer.innerHTML = "";
    questionContainer.innerHTML = name + ": " + score;
}
clickViewScores.addEventListener("click", () => {
    highScores();

})

// Final page determination
var initials; 
function endQuizPage() {
    resetDisplay();
    timerEl.textContent = "";
    clearInterval(quizDuration);
    var endPage = document.createElement("h2");
    questionContainer.appendChild(endPage);

    let blank = document.querySelector("#answer-determination");
    blank.innerHTML = "";

    endPage.innerHTML = "All done! Your final score is " + userScore + ". Enter your initials to save";

    var initialBox = document.createElement("input");
    blank.appendChild(initialBox);

    var submitInitialBtn = document.createElement("button");
    submitInitialBtn.textContent = "Submit";
    blank.appendChild(submitInitialBtn);

    submitInitialBtn.addEventListener("click", () => {
        
        // store variables
        
        if (initialBox.value.length === 0) return false;

        let storeInitials = (...input) => {
            let data = JSON.stringify({ "name":input[0], "score":input[1]})
            localStorage.setItem("object", data)
        }

        storeInitials(initialBox.value, userScore);
  
        //Play again determination
        
        var playAgain = document.createElement("button");
        playAgain.textContent= "Play Again!";
        blank.appendChild(playAgain);

        playAgain.addEventListener("click", () => {
            location.reload();
        })

        if (playAgain.textContent = "Play Again!") 
          submitInitialBtn.style.display = 'none';
    });

    document.querySelector("input").value = "";

    // initialBox.addEventListener("submit", endQuizPage);
    
};

function renderInitials() {
    submitInitialBtn.addEventListener('click', function(event) {
        event.preventDefault;
}
)};

clickStart.addEventListener('click', quiz);