

    const myImg = '<img src="https://i.postimg.cc/d3n67j6M/Screenshot-2025-08-23-200845.png width="300px" height="200px"></img><p>Resistance equivalance of the circuit?</p>';
const questions = [
    
   
 // Q1
  {
    q: " What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: 2,
    desc: "Paris is the capital of France, known as the City of Light."
  },
  //Q2
  {
    q: " Which planet is called the Red Planet?",
    options: ["Earth", "Venus", "Mars", "Jupiter"],
    answer: 2,
    desc: "Mars is called the Red Planet because of its reddish appearance."
  },

   //Q3
    {
    q: " Select A",
    options: ["a", "A", "c", "B"],
    answer: 1,
    desc: ""
  },
  //Q4
    {
    q: " Select z",
    options: ["Z", "z", "x", "y"],
    answer: 1,
    desc: ""
  },
  //Q5
    {
    q: " Select S",
    options: ["S", "s", "H", "T"],
    answer: 0,
    desc: ""
  },
  //Q6
    {
    q: " Select y",
    options: ["Y", "g", "i", "y"],
    answer: 3,
    desc: ""
  },

  //Q7
  {
     q: " Select c",
    options: ["a","b","c"],
    answer: 2,
    desc: ""
  },

  
   //Q8
  {
    q: " <p><math><msqrt><mn>544</mn></msqrt></math> is equal to?</p> ",
    options: ["<p>16<math><msqrt><mn>17</mn></msqrt></math></p>",
         "<p>4<math><msqrt><mn>34</mn></msqrt></math></p>",
          "<p>8<math><msqrt><mn>34</mn></msqrt></math></p>",
           "<p>6<math><msqrt><mn>24</mn></msqrt></math></p>"],
    answer: 1,
    desc: "<p style = font-size: 20px;><math><msqrt><mn>544</mn></msqrt></math> = <math><msqrt><mn>2 x 272</mn></msqrt> </math> = <math><msqrt><mn>2 x 2 x 136</mn></msqrt></math> = <math><msqrt><mn>2 x 2 x 2 x 68</mn></msqrt></math> = <math><msqrt><mn>2 x 2 x 2 x 2 x 34</mn></msqrt></math> = <math><msqrt><mn>16 x 34</mn></msqrt></math> = <p style = font-size:30px;>4<math><msqrt><mn>34</mn></msqrt></math></p></p>"
  },
  
  //Q9
    {
    q: " A for ?",
    options: ["Apple", "Anda", "Anaar", "Aam"],
    answer: 0,
    desc: ""
  },
  //Q10
       {
    q: myImg,
    options: ["500", "350", "400", "600"],
   answer: 2,
   desc: ""
 },
  
];


let currentQ = 0;
let attempts = 0;
let selectedOption = null;
let timer; // Variable to hold the countdown timer interval
let timeLeft = 60; // Initial time for the timer

const questionDiv = document.getElementById("question");
const optionsDiv = document.getElementById("options");
const confirmBtn = document.getElementById("confirmBtn");
const nextBtn = document.getElementById("nextBtn");
const descriptionDiv = document.getElementById("description");
const Qstart = document.getElementById("strt");
const timerDiv = document.getElementById("timer"); // Get the new timer element

function startTimer() {
  clearInterval(timer); // Clear any existing timer
  timeLeft = 60;
  timerDiv.textContent = timeLeft + "s";
  timerDiv.classList.remove("low"); // Reset low timer class

  timer = setInterval(() => {
    timeLeft--;
    timerDiv.textContent = timeLeft + "s";

    if (timeLeft <= 10) {
      timerDiv.classList.add("low");
    }

    if (timeLeft <= 0) {
      clearInterval(timer);
      confirmBtn.click(); // Automatically confirm when time runs out
    }
  }, 1000); // Update every second
}

function stopTimer() {
  clearInterval(timer);
}

function loadQuestion() {
  const qObj = questions[currentQ];
  questionDiv.innerHTML = (currentQ + 1) + ". " + qObj.q;
  optionsDiv.innerHTML = "";
  descriptionDiv.style.display = "none";
  confirmBtn.disabled = true;
  nextBtn.style.display = "none";
  attempts = 0;
  selectedOption = null;

  startTimer(); // Start the timer for the new question

  qObj.options.forEach((opt, i) => {
    const btn = document.createElement("div");
    btn.classList.add("option");
    btn.innerHTML = opt;

    btn.addEventListener("click", () => {
      document.querySelectorAll(".option").forEach(o => o.classList.remove("selected"));
      btn.classList.add("selected");
      selectedOption = i;
      confirmBtn.disabled = false;
    });

    optionsDiv.appendChild(btn);
  });
}

confirmBtn.addEventListener("click", () => {
  if (selectedOption === null) return;
  attempts++;
  stopTimer(); // Stop the timer when the user confirms their answer

  const qObj = questions[currentQ];
  const allOptions = document.querySelectorAll(".option");

  if (selectedOption === qObj.answer) {
    allOptions[selectedOption].classList.add("correct");
    showDescription(qObj.desc);
    confirmBtn.disabled = true;
    nextBtn.style.display = "inline-block";
  } else {
    allOptions[selectedOption].classList.add("wrong");
    if (attempts === 2) {
      allOptions[qObj.answer].classList.add("correct");
      showDescription(qObj.desc);
      confirmBtn.disabled = true;
      nextBtn.style.display = "inline-block";
    }
  }
});

nextBtn.addEventListener("click", () => {
  currentQ++;
  if (currentQ < questions.length) {
    loadQuestion();
  } else {
    showFinalScore();
    stopTimer(); // Stop the timer when the quiz is finished
  }
});

function showDescription(text) {
  descriptionDiv.innerHTML = text;
  descriptionDiv.style.display = "block";
}

function showFinalScore() {
  questionDiv.textContent = "🎉 Quiz Finished!";
  optionsDiv.innerHTML = "";
  confirmBtn.style.display = "none";
  nextBtn.style.display = "none";
  descriptionDiv.textContent = "Well done! You completed the quiz.";
  descriptionDiv.style.display = "block";
}

Qstart.addEventListener("click", () => {
  loadQuestion();
  Qstart.style.display = "none";
});
