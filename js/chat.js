const chatBox=document.getElementById("chatBox");

document.getElementById("sendBtn").addEventListener("click",async()=>{

const question=document.getElementById("question").value;

if(question==="") return;

chatBox.innerHTML+=`

<div class="message user">

${question}

</div>

`;

document.getElementById("question").value="";

const response=await fetch("http://localhost:3000/chat",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

question

})

});

const data=await response.json();

chatBox.innerHTML+=`

<div class="message ai">

${data.reply}

</div>

`;

chatBox.scrollTop=chatBox.scrollHeight;

});