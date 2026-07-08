const email = sessionStorage.getItem("email");
const subjects = sessionStorage.getItem("subjects");
const examDate = sessionStorage.getItem("examDate");
const hours = sessionStorage.getItem("hours");

document.getElementById("subjectText").textContent = subjects;
document.getElementById("dateText").textContent = examDate;
document.getElementById("hourText").textContent = hours;

document.getElementById("generateAI").addEventListener("click", async () => {

    const studyPlan = document.getElementById("studyPlan");

    studyPlan.innerHTML = `
        <p>Analyzing subjects...</p>
        <p>Calculating study schedule...</p>
        <p>Generating AI study plan...</p>
    `;

    try {

        const response = await fetch("https://studypilotai-production.up.railway.app/studyplan", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                subjects,
                examDate,
                hours
            })

        });

        const data = await response.json();

        studyPlan.innerHTML = data.plan;

    } catch (error) {

        studyPlan.innerHTML = `
            <h3>Unable to connect to AI.</h3>
            <p>Please check if your server is running.</p>
        `;

        console.log(error);

    }

});
document.getElementById("startAgent").addEventListener("click", startAgent);

async function startAgent() {

    const studyPlan = document.getElementById("studyPlan").innerHTML;

    if (!email || !email.includes("@")) {
        alert("Please enter a valid email address.");
        return;
    }

    const response = await fetch("https://studypilotai-production.up.railway.app/start-agent", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email,
            subjects,
            examDate,
            hours,
            studyPlan

        })

    });

    const data = await response.json();

    alert(data.message);

}