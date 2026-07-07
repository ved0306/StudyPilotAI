const button = document.getElementById("generateBtn");

button.addEventListener("click", () => {

    const subjects = document.getElementById("subjects").value;
    const examDate = document.getElementById("examDate").value;
    const hours = document.getElementById("hours").value;

    if(subjects === "" || examDate === "" || hours === ""){
        alert("Please fill all fields.");
        return;
    }

    sessionStorage.setItem("subjects", subjects);
    sessionStorage.setItem("examDate", examDate);
    sessionStorage.setItem("hours", hours);

    window.location.href = "studyplan.html";

});