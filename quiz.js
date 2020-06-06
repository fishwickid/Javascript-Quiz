// select all elements

const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const floatingTimer = document.getElementById("floatingTimer");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const scoreDiv = document.getElementById("scoreContainer");
const secondsDisplay = document.querySelector("#seconds");
var answerDisplay = document.getElementById("answerDisplay")
const saveInitial = document.getElementById("saveInitial");
const scoreRegister = document.getElementById("scoreRegister");


// create our questions
let questions = [
    {
        question: "What is the purpose of a variable?",
        choiceA : "Assigns a data value to something",
        choiceB : "Change the colour of a word",
        choiceC : "Initiates a function",
        correct : "A"
    },{
        question : "How many elements can an array hold",
        choiceA : "Your age times 18",
        choiceB : "A limitless amount",
        choiceC : "99 as a computer can't handle 3 digits",
        correct : "B"
    },{
        question: "Is Javascript and Java the same programming language?",
        choiceA : "They are exactly the same",
        choiceB : "Sometimes they are",
        choiceC : "No, they are completely different languages",
        correct : "C"
    },{
        question: "Why would you use console.log?",
        choiceA : "Check the time",
        choiceB : "Log your code to check if it's working ok",
        choiceC : "To tell the user what's happening behind the code",
        correct : "B"
    },{
        question: "Where is the correct place to insert a JavaScript?",
        choiceA : "The head section",
        choiceB : "The body section",
        choiceC : "Both sections are acceptable",
        correct : "C"
    }
];

// create some variables

const lastQuestion = questions.length -1;
let runningQuestion = 0;
let count = 20;
let TIMER;
let score = 0;



// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    question.innerHTML = "<p>"+ q.question +"</p>";
    
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

// add listener to start button
start.addEventListener("click",startQuiz);


// start quiz
function startQuiz(){
    start.style.display = "none";
    intro.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    floatingTimer.style.display = "block";
    renderProgress();
    
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}


// Counting down 
var interval = setInterval(function(){
 document.getElementById('count').innerHTML=count;
 count--;
 if (count === 0){
    document.getElementById('count').innerHTML= "Time's Up";
    clearInterval(interval);
    scoreRender()
  }
}, 1000);


// check Anwer

function checkAnswer(answer){
    // answer is correct
    if( answer == questions[runningQuestion].correct){
        score++;
        answerIsCorrect();
    }
     // answer is wrong
    else {
        answerIsWrong();
    }
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
       // clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    confirm("That's Correct");
}

// answer is Wrong
function answerIsWrong(){
    confirm("Sorry, that's incorrect");
}

// score render
function scoreRender(){
    document.getElementById('count').innerHTML= "You're Done!";
    clearInterval(interval);
    scoreDiv.style.display = "block";
    question.style.display = "none";
    choices.style.display = "none";
    answerDisplay.innerHTML += "<p>You Scored "+ score +"/5</p>";
}

// Adding your score to the tally

var todoInput = document.querySelector("#user-text");
var todoForm = document.querySelector("#user-form");
var todoList = document.querySelector("#user-list");
var todoCountSpan = document.querySelector("#user-count");

var todos = ["Rami", "Elise", "Chad"];

renderTodos();

function renderTodos() {
  // Clear todoList element and update todoCountSpan
  todoList.innerHTML = "";
  todoCountSpan.textContent = todos.length;

  // Render a new li for each todo
  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i];

    var li = document.createElement("li");
    li.textContent = todo;
    todoList.appendChild(li);
  }
}

// When form is submitted...
todoForm.addEventListener("submit", function(event) {
  event.preventDefault();

  var todoText = todoInput.value.trim();

  // Return from function early if submitted todoText is blank
  if (todoText === "") {
    return;
  }

  // Add new todoText to todos array, clear the input
  todos.push(todoText);
  todoInput.value = "";

  // Re-render the list
  renderTodos();
});
