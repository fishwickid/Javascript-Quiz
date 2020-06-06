// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const floatingTimer = document.getElementById("floatingTimer");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
//const counter = document.getElementById("counter");
const scoreDiv = document.getElementById("scoreContainer");
const secondsDisplay = document.querySelector("#seconds");
const answerDisplay = document.getElementById("answerDisplay")
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
    }
];

// create some variables

const lastQuestion = questions.length -1;
let runningQuestion = 0;
let count = 9;
//const questionTime =0; // 10s
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

start.addEventListener("click",startQuiz);


// start quiz
function startQuiz(){
    start.style.display = "none";
    intro.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    floatingTimer.style.display = "block";
    renderProgress();
    //renderCounter();
    //TIMER = setTimeout(renderCounter,30000); // 1000ms = 1s
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


/*

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}
*/

// checkAnwer

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
    //count = 0;
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
    //document.getElementById("answerDisplay").innerHTML = "This is correct";
    confirm("That's Correct");
}

// answer is Wrong
function answerIsWrong(){
    confirm("Sorry, that's incorrect");
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    question.style.display = "none";
    choices.style.display = "none";
    //saveInitial.addEventListener("submit", function(event) {
        
    answerDisplay.innerHTML += "<p>"+ score +"/10</p>";
    localStorage.setItem("scoreRegister", score);
}

// testing functions

var todoInput = document.querySelector("#todo-text");
var todoForm = document.querySelector("#todo-form");
var todoList = document.querySelector("#todo-list");
var todoCountSpan = document.querySelector("#todo-count");

var todos = [];

init();

function renderTodos() {
  // Clear todoList element and update todoCountSpan
  todoList.innerHTML = "";
  todoCountSpan.textContent = todos.length;

  // Render a new li for each todo
  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i];

    var li = document.createElement("li");
    li.textContent = todo;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Complete";

    li.appendChild(button);
    todoList.appendChild(li);
  }
}

function init() {
  // Get stored todos from localStorage
  // Parsing the JSON string to an object
  var storedTodos = JSON.parse(localStorage.getItem("todos"));

  // If todos were retrieved from localStorage, update the todos array to it
  if (storedTodos !== null) {
    todos = storedTodos;
  }

  // Render todos to the DOM
  renderTodos();
}

function storeTodos() {
  // Stringify and set "todos" key in localStorage to todos array
  localStorage.setItem("todos", JSON.stringify(todos));
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

  // Store updated todos in localStorage, re-render the list
  storeTodos();
  renderTodos();
});

// When a element inside of the todoList is clicked...
todoList.addEventListener("click", function(event) {
  var element = event.target;

  // If that element is a button...
  if (element.matches("button") === true) {
    // Get its data-index value and remove the todo element from the list
    var index = element.parentElement.getAttribute("data-index");
    todos.splice(index, 1);

    // Store updated todos in localStorage, re-render the list
    storeTodos();
    renderTodos();
  }
});
