let questions = [
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
  { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
  { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
  { question: "What is 5 x 3?", options: ["15", "10", "20", "25"], answer: "15" },
  { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Hemingway", "Dickens", "Austen"], answer: "Shakespeare" },
  { question: "Which is the largest ocean?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: "Pacific" }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;

document.getElementById("username").addEventListener("input", function() {
  document.getElementById("startBtn").classList.toggle("hidden", this.value.trim() === "");
});

function startQuiz() {
  document.getElementById("startContainer").classList.add("hidden");
  document.getElementById("quizContainer").classList.remove("hidden");
  loadQuestion();
}

function startTimer() {
  let seconds = 60;
  document.getElementById("seconds").textContent = seconds;
  clearInterval(timer);

  timer = setInterval(() => {
      seconds--;
      document.getElementById("seconds").textContent = seconds;
      if (seconds === 0) {
          clearInterval(timer);
          nextQuestion();
      }
  }, 1000);
}

function loadQuestion() {
  let q = questions[currentQuestionIndex];
  document.getElementById("question").textContent = q.question;
  let optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  let nextBtn = document.getElementById("nextBtn");
  nextBtn.disabled = true;
  nextBtn.classList.remove("enabled");
  
  startTimer();

  q.options.forEach(option => {
      let btn = document.createElement("button");
      btn.textContent = option;
      btn.onclick = () => {
          checkAnswer(option);
          nextBtn.disabled = false;
          nextBtn.classList.add("enabled");
          document.querySelectorAll(".options button").forEach(btn => btn.style.backgroundColor = "");
          btn.style.backgroundColor = "rgb(19,180,149)";
      };
      optionsDiv.appendChild(btn);
  });
}

function checkAnswer(answer) {
  if (answer === questions[currentQuestionIndex].answer) {
      score++;
  }
}

function nextQuestion() {
  clearInterval(timer);
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
      loadQuestion();
  } else {
      showResult();
  }
}

function showResult() {
  document.getElementById("quizContainer").classList.add("hidden");
  let resultContainer = document.getElementById("resultContainer");
  resultContainer.classList.remove("hidden");
  let percentage = (score / questions.length) * 100;
  let message = percentage >= 50 ? "Congratulations!" : "Bad Luck! Try Again";
  resultContainer.innerHTML = `<h2>${message}</h2>
                              <p>Total Questions: ${questions.length}</p>
                              <p>Attempted: ${questions.length}</p>
                              <p>Correct: ${score}</p>
                              <p>Wrong: ${questions.length - score}</p>
                              <p>Percentage: ${percentage.toFixed(2)}%</p>
                              <button onclick="location.reload()">Try Again</button>`;
}
  
  