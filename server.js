import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config({ override: true });

const app = express();

app.use(cors());
app.use(express.json());
console.log("All env keys:", Object.keys(process.env));
console.log("GROQ_API_KEY:", process.env.GROQ_API_KEY);
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

app.post("/studyplan", async (req, res) => {

    try {

        const { subjects, examDate, hours } = req.body;
        const today = new Date();
const exam = new Date(examDate);

const diffTime = exam - today;
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

       const prompt = `
You are an expert study mentor.

Today's date is ${today.toISOString().split("T")[0]}.

Create a study plan.

Subjects:
${subjects}

Exam Date:
${examDate}

Remaining Time:
${diffDays} days

Daily Study Hours:
${hours}

Create a realistic study plan based on the remaining days.
Do not guess the remaining time.
Format the response in HTML using headings, paragraphs and bullet points.
`;

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        });
console.log(completion);
console.log(completion.choices[0].message.content);
        res.json({
            plan: completion.choices[0].message.content
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Something went wrong."
        });

    }

});
app.post("/chat", async (req, res) => {

try{

const { question } = req.body;

const completion = await groq.chat.completions.create({

model:"llama-3.3-70b-versatile",

messages: [

    {
        role: "system",

        content: `
You are a friendly AI tutor.

When answering:

- Start with a short definition.
- Explain in simple language.
- Give an example.
- Mention advantages if relevant.
- End with a short summary.

Return ONLY valid HTML.

Rules:
- Use <h2> for the main heading.
- Use <h3> for subheadings.
- Use <p> for paragraphs.
- Use <ul> and <li> for bullet points.
- Use <strong> for important terms.
- Do NOT use Markdown.
- Do NOT use **, ##, ---, ===, or backticks.
`
    },

    {
        role: "user",
        content: question
    }

]

});

res.json({

reply:completion.choices[0].message.content

});

}

catch(error){

console.log(error);

res.status(500).json({

error:"Something went wrong."

});

}

});
app.post("/quiz", async (req, res) => {

    try {

        const { subject, topic, count } = req.body;

        const prompt = `
Generate exactly ${count} multiple choice questions about "${topic}" in the subject "${subject}".

Return ONLY valid JSON.

Format:

Return ONLY valid JSON.

{
  "questions":[
    {
      "question":"Question",
      "options":[
        "Option A",
        "Option B",
        "Option C",
        "Option D"
      ],
      "correctAnswer":"Option B",
      "difficulty":"Easy",
      "topic":"${topic}"
    }
  ]
}

Do not include markdown.
Do not include explanations.
Do not include any extra text.
`;

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            response_format: {
                type: "json_object"
            }
        });

        res.json(
            JSON.parse(completion.choices[0].message.content)
        );

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Unable to generate quiz."
        });

    }

});
app.post("/explain", async (req, res) => {

    try {

        const { question, correctAnswer } = req.body;

        const completion = await groq.chat.completions.create({

            model: "llama-3.3-70b-versatile",

            messages: [

                {
                    role: "system",
                    content: `
Explain the correct answer in simple language.

Return HTML only.

Use:
<h3>
<p>

Keep it under 120 words.
`
                },

                {
                    role: "user",
                    content: `
Question:
${question}

Correct Answer:
${correctAnswer}
`
                }

            ]

        });

        res.json({

            explanation: completion.choices[0].message.content

        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            error:"Unable to explain."

        });

    }

});
app.post("/start-agent", async (req, res) => {

    try {

        console.log("========== AI Agent ==========");
        console.log(req.body);
        console.log("==============================");

        const response = await fetch(
            "https://ved0306.app.n8n.cloud/webhook/studyplan-agent",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(req.body)
            }
        );

        const data = await response.json();

        res.json(data);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Unable to start AI Agent."
        });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});