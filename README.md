# StudyPilot AI

An AI-powered learning platform that helps students plan, practice, and improve their studies through personalized study plans, AI tutoring, quiz generation, and automated email delivery.

---

## Live Demo

Frontend:
https://ved0306.github.io/StudyPilotAI/

Backend:
https://studypilotai-production.up.railway.app

GitHub Repository:
https://github.com/ved0306/StudyPilotAI

---

# SDG

**Sustainable Development Goal 4 – Quality Education**

StudyPilot AI contributes to SDG 4 by providing students with personalized AI-powered learning assistance, enabling better study planning, concept understanding, and self-assessment.

---

# Features

### AI Study Planner

- Generates personalized study plans
- Creates schedules based on:
  - Subjects
  - Exam Date
  - Daily Study Hours
- Suggests revision strategy
- Provides study tips

---

### AI Tutor

- Answers academic questions
- Explains concepts in simple language
- Provides structured HTML responses
- Covers multiple academic subjects

---

### Quiz Generator

- Generates topic-wise MCQs
- Multiple difficulty levels
- Instant evaluation
- AI-generated explanations for answers

---

### AI Explanations

- Step-by-step explanations
- Easy-to-understand concepts
- Supports self-learning

---

### Email Automation

Using **n8n** automation:

- Sends generated study plans to the user's email
- Eliminates manual sharing
- Fully automated workflow

---

# Technology Stack

## Frontend

- HTML5
- CSS3
- JavaScript

## Backend

- Node.js
- Express.js

## Artificial Intelligence

- Groq API
- Llama 3.3 70B Versatile

## Automation

- n8n
- Gmail Integration

## Deployment

- GitHub Pages (Frontend)
- Railway (Backend)

## Version Control

- Git
- GitHub

---

# System Architecture

```
                    User
                      │
                      ▼
             GitHub Pages
             (Frontend UI)
                      │
                      ▼
            Railway Backend
           (Node.js + Express)
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
     Groq AI API             n8n Workflow
          │                       │
          ▼                       ▼
 AI Responses               Gmail Automation
```

---

# Project Modules

## Home

- Landing page
- About section
- Features section

## Dashboard

Users enter:

- Email Address
- Subjects
- Exam Date
- Daily Study Hours

---

## Study Planner

Generates a personalized AI study schedule based on user inputs.

---

## AI Tutor

Students can ask questions and receive AI-generated explanations.

---

## Quiz Generator

Creates customized quizzes based on:

- Subject
- Topic
- Number of Questions

---

## Email Automation

Users can receive their generated study plans directly in their email using n8n automation.

---

# Project Workflow

1. User enters study details.
2. Data is sent to the Express backend.
3. Backend communicates with Groq AI.
4. AI generates:
   - Study Plan
   - Quiz
   - AI Tutor Responses
5. User can request the study plan via email.
6. Backend triggers the n8n workflow.
7. n8n sends the study plan to the user's email.

---

# Folder Structure

```
StudyPilotAI/

│── css/
│── js/
│── images/
│── index.html
│── dashboard.html
│── studyplan.html
│── chat.html
│── quiz.html
│── server.js
│── package.json
│── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/ved0306/StudyPilotAI.git
```

---

## Install Dependencies

```bash
npm install
```

---

## Create Environment File

Create a `.env` file:

```env
GROQ_API_KEY=your_groq_api_key
PORT=3000
```

---

## Run Backend

```bash
npm start
```

or

```bash
npm run dev
```

---

## Deployment

### Frontend

- GitHub Pages

### Backend

- Railway

---

# Future Scope

- MongoDB integration
- User Authentication
- Progress Tracking Dashboard
- Performance Analytics
- Mobile Application
- Google OAuth Integration
- Self-hosted n8n
- Personalized Learning Analytics

---

# Learning Outcomes

During this project, the following technologies and concepts were implemented:

- REST APIs
- AI Integration
- Prompt Engineering
- Express.js
- JavaScript
- HTML & CSS
- Git & GitHub
- Railway Deployment
- GitHub Pages
- Environment Variables
- n8n Workflow Automation
- Email Automation
- API Integration

---

# Author

**Vedika Prabhu**

Department of Computer Science & Engineering

Second Year (CSE)

Yashwantrao Bhonsale Institute of Technology

---

# License

This project is developed for educational and internship purposes.

---

## Acknowledgements

- Groq AI
- Railway
- GitHub
- n8n
- Open Source Community
