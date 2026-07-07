let quizData = [];

const generateBtn = document.getElementById("generateQuiz");
const quizArea = document.getElementById("quizArea");

generateBtn.addEventListener("click", generateQuiz);

async function generateQuiz() {

    const subject = document.getElementById("subject").value.trim();
    const topic = document.getElementById("topic").value.trim();
    const count = document.getElementById("count").value;

    if (!subject || !topic) {
        alert("Please enter Subject and Topic.");
        return;
    }

    quizArea.innerHTML = `
        <div class="planner-card">
            <h2>Generating Quiz...</h2>
            <p>Please wait while the AI creates your quiz.</p>
        </div>
    `;

    try {

        const response = await fetch("http://localhost:3000/quiz", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                subject,
                topic,
                count
            })

        });

        const data = await response.json();

        quizData = data.questions;

        displayQuiz();

    }

    catch (error) {

        console.log(error);

        quizArea.innerHTML = `
            <div class="planner-card">
                <h2>Error</h2>
                <p>Unable to generate quiz.</p>
            </div>
        `;

    }

}

function displayQuiz() {

    quizArea.innerHTML = "";

    quizData.forEach((q, index) => {

        let card = `

        <div class="questionCard">

            <h3>Question ${index + 1}</h3>

            <p>${q.question}</p>

        `;

        q.options.forEach(option => {

            card += `

            <label class="option">

                <input
                    type="radio"
                    name="q${index}"
                    value="${option}">

                <span>${option}</span>

            </label>

            `;

        });

        card += `

        </div>

        `;

        quizArea.innerHTML += card;

    });

    quizArea.innerHTML += `

        <button id="submitQuiz">

            Submit Quiz

        </button>

    `;

    document
        .getElementById("submitQuiz")
        .addEventListener("click", checkAnswers);

}
function checkAnswers() {

    let score = 0;

    let resultHTML = "";

    quizData.forEach((q, index) => {

        const selected = document.querySelector(
            `input[name="q${index}"]:checked`
        );

        const userAnswer = selected ? selected.value : "Not Answered";

        const correct = userAnswer === q.correctAnswer;

        if (correct) score++;

        resultHTML += `

        <div class="resultCard">

            <h3>Question ${index + 1}</h3>

            <p>

            ${correct ? "✅ Correct" : "❌ Incorrect"}

            </p>

        </div>

        `;

    });

    const percent = Math.round(score / quizData.length * 100);

    let performance = "";

    let stars = "";

    if (percent === 100) {

        performance = "Excellent! Perfect Score.";

        stars = "⭐⭐⭐⭐⭐";

    }

    else if (percent >= 80) {

        performance = "Great Job!";

        stars = "⭐⭐⭐⭐";

    }

    else if (percent >= 60) {

        performance = "Good Work.";

        stars = "⭐⭐⭐";

    }

    else if (percent >= 40) {

        performance = "Keep Practicing.";

        stars = "⭐⭐";

    }

    else {

        performance = "Needs Improvement.";

        stars = "⭐";

    }

    quizArea.innerHTML = `

    <div class="planner-card">

        <h1>Quiz Results</h1>

        <br>

        <h2>${score} / ${quizData.length}</h2>

        <h3>${percent}%</h3>

        <h2>${stars}</h2>

        <p>${performance}</p>

        <hr>

        ${resultHTML}

        <button onclick="location.reload()">

        Take Another Quiz

        </button>

    </div>

    `;

}