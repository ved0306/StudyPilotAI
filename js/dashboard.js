const button = document.getElementById("generateBtn");

button.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const subjects = document.getElementById("subjects").value;
    const examDate = document.getElementById("examDate").value;
    const hours = document.getElementById("hours").value;

   if(email === "" || subjects === "" || examDate === "" || hours === ""){
    alert("Please fill all fields.");
    return;
    }
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("subjects", subjects);
    sessionStorage.setItem("examDate", examDate);
    sessionStorage.setItem("hours", hours);

    window.location.href = "studyplan.html";

});