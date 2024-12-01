let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// Elements
const questionForm = document.getElementById("question-form");
const quizDiv = document.getElementById("quiz");
const resultsDiv = document.getElementById("results");
const createQuizForm = document.getElementById("create-quiz");
const addQuestionButton = document.getElementById("add-question");
const startQuizButton = document.getElementById("start-quiz");
const nextQuestionButton = document.getElementById("next-question");
const restartQuizButton = document.getElementById("restart-quiz");
const quizQuestion = document.getElementById("quiz-question");
const quizOptions = document.getElementById("quiz-options");
const scoreDisplay = document.getElementById("score");

// Add Question
addQuestionButton.addEventListener("click", () => {
    const question = document.getElementById("question").value;
    const options = [
        document.getElementById("option1").value,
        document.getElementById("option2").value,
        document.getElementById("option3").value,
        document.getElementById("option4").value,
    ];
    const correct = parseInt(document.getElementById("correct-answer").value) - 1;

    if (question && options.every(opt => opt) && correct >= 0 && correct < 4) {
        questions.push({ question, options, correct });
        createQuizForm.reset();
        startQuizButton.style.display = "inline-block";
    } else {
        alert("Please fill all fields and ensure the correct answer is between 1 and 4.");
    }
});

// Start Quiz
startQuizButton.addEventListener("click", () => {
    questionForm.style.display = "none";
    quizDiv.style.display = "block";
    loadQuestion();
});

// Load Question
function loadQuestion() {
    quizOptions.innerHTML = "";
    const currentQuestion = questions[currentQuestionIndex];
    quizQuestion.textContent = currentQuestion.question;

    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.textContent = option;
        li.addEventListener("click", () => checkAnswer(index, li));
        quizOptions.appendChild(li);
    });
}

// Check Answer
function checkAnswer(selectedIndex, selectedElement) {
    const correctIndex = questions[currentQuestionIndex].correct;
    const options = document.querySelectorAll("#quiz-options li");

    options.forEach(option => (option.style.pointerEvents = "none"));

    if (selectedIndex === correctIndex) {
        selectedElement.classList.add("correct");
        score++;
    } else {
        selectedElement.classList.add("incorrect");
        options[correctIndex].classList.add("correct");
    }
}

// Next Question
nextQuestionButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

// Show Results
function showResults() {
    quizDiv.style.display = "none";
    resultsDiv.style.display = "block";
    scoreDisplay.textContent = `Your Score: ${score} / ${questions.length}`;
}

// Restart Quiz
restartQuizButton.addEventListener("click", () => {
    resultsDiv.style.display = "none";
    questionForm.style.display = "block";
    questions = [];
    currentQuestionIndex = 0;
    score = 0;
    startQuizButton.style.display = "none";
});
