// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const floatingTimer = document.getElementById("floatingTimer");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const scoreDiv = document.getElementById("scoreContainer");
const secondsDisplay = document.querySelector("#seconds");
const answerDisplay = document.getElementById("answerDisplay")


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
console.log(lastQuestion);
let runningQuestion = 0;
let count = 99;
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
  clearInterval(interval);
   scoreRender()
  }
}, 1000);

/*function renderCounter(){
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
    count = 0;
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
    //p.style.display = "none";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    answerDisplay.innerHTML += "<p>"+ score +"/10</p>";
}
