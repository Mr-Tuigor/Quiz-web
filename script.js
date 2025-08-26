const myImg1 = '<img src="https://i.postimg.cc/pV7Hxggp/Screenshot-2025-08-25-201537.png" width="300px" height="200px"></img><p>Resistance equivalance of the circuit?</p>';
const myImg = '<img src="https://i.postimg.cc/d3n67j6M/Screenshot-2025-08-23-200845.png width="300px" height="200px"></img><p>Resistance equivalance of the circuit?</p>';
const myImg2 = '<img src="https://i.postimg.cc/bJKVCJ7c/Transister.webp" width="300px" height="200px"></img><p>From the shown image the terminal having arrow is?</p>'
const questions = [

// Q1
{
    q: " What is the first step on the Process of PCB design?",
    options: ["Circuit Schematic Drawing", "PCB Layout Design", "Drilling holes", "Etching Process"],
    answer: 0,
    desc: "Drawing the Schematic of the circuit is the first step on the Process of PCB design"
},
//Q2
{
    q: " Which of the below component is a Active component?",
    options: ["Resistor", "Piezoelectric", "Transformer", "Inductor"],
    answer: 1,
    desc: "Piezoelectrics are an Active component"
},

//Q3
{
    q: " Which of the component below store and release electrical energy",
    options: ["Inductor", "Capacitor", "Resistor", "Inductor & Capacitor"],
    answer: 1,
    desc: "Inductor stores and releases Electrical Energy"
},
//Q4
{
    q: " What is Rectifier used for?",
    options: [" Convert AC to DC", "convert Higher AC to Lower AC", "converts DC to AC", "convert higher DC to Lower DC"],
    answer: 0,
    desc: "Rectifier is Used to convert AC to DC"
},
//Q5
{
    q: myImg2,
    options: ["Base", "Collector", "Emitter", "none"],
    answer: 2,
    desc: "The Arrow indicates the Emitter Terminal"
},
//Q6
{
    q: " An Integrated Circuit(IC) is also known as?",
    options: ["MicroProcessor", "MiniChip", "processor", "MicroChip"],
    answer: 3,
    desc: "IC is also known as MicroChip"
},

//Q7
{
    q: " Which solution is used for Etching process while PCB designing?",
    options: ["Nacl","FeCL3","FeCL2","FeSO4"],
    answer: 1,
    desc: "FeCL3 is used in the Etching Process"
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
    q: myImg1,
    options: ["103.6k", "106.8k", "103.9k", "106k"],
    answer: 0,
    desc: ""
},
//Q10
{
    q: myImg,
    options: ["500", "350", "400", "600"],
    answer: 2,
    desc: "four 600 ohm and one 1.2k ohm"
},

];

let currentQ = 0;
let attempts = 0;
let selectedOption = null;
let timer; // Variable to hold the countdown timer interval
let timeLeft = 60; // Initial time for the timer
let timeRemainingForAttempt = 60; // Stores remaining time for the next attempt

const questionDiv = document.getElementById("question");
const optionsDiv = document.getElementById("options");
const confirmBtn = document.getElementById("confirmBtn");
const nextBtn = document.getElementById("nextBtn");
const descriptionDiv = document.getElementById("description");
const Qstart = document.getElementById("strt");
const timerDiv = document.getElementById("timer"); // Get the new timer element

function startTimer() {
    clearInterval(timer); // Clear any existing timer

    if (attempts === 0) { // Only set initial time on the first attempt
        if (currentQ === 8 || currentQ === 9) { // Questions are 0-indexed, so Q9 is index 8 and Q10 is index 9
            timeRemainingForAttempt = 180;
        } else {
            timeRemainingForAttempt = 60;
        }
    }

    timerDiv.textContent = timeRemainingForAttempt + "s";
    timerDiv.classList.remove("low"); // Reset low timer class

    timer = setInterval(() => {
        timeRemainingForAttempt--;
        timerDiv.textContent = timeRemainingForAttempt + "s";

        if (timeRemainingForAttempt <= 10) {
            timerDiv.classList.add("low");
        }

        if (timeRemainingForAttempt <= 0) {
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
    timerDiv.style.display = "block"; // Make sure the timer is visible for the new question

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
            stopTimer(); // Stop the timer when an option is selected
        });

        optionsDiv.appendChild(btn);
    });
}

confirmBtn.addEventListener("click", () => {
    if (selectedOption === null) return;
    attempts++;

    const qObj = questions[currentQ];
    const allOptions = document.querySelectorAll(".option");

    if (selectedOption === qObj.answer) {
        allOptions[selectedOption].classList.add("correct");
        showDescription(qObj.desc);
        confirmBtn.disabled = true;
        nextBtn.style.display = "inline-block";
        stopTimer(); // Ensure the timer is stopped on a correct answer
    } else {
        allOptions[selectedOption].classList.add("wrong");
        if (attempts === 2) {
            allOptions[qObj.answer].classList.add("correct");
            showDescription(qObj.desc);
            confirmBtn.disabled = true;
            nextBtn.style.display = "inline-block";
            stopTimer(); // Stop the timer on the second attempt
        } else {
            startTimer(); // Continue the timer for the second attempt
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
    timerDiv.style.display = "none"; // Hide the timer after the quiz is over
}

Qstart.addEventListener("click", () => {
    loadQuestion();
    Qstart.style.display = "none";
});



