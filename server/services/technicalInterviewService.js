const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const generateTechnicalQuestion = async (

    role,
    difficulty,
    topic,
    conversationHistory

) => {

    const prompt = `
You are a Senior FAANG Software Engineering Interviewer.

Candidate Role:

${role}

Interview Difficulty:

${difficulty}

Current Topic:

${topic}

Previous Conversation:

${conversationHistory}

Rules:

1. Ask ONLY ONE technical interview question.

2. The question MUST belong to the Current Topic.

3. Don't repeat previous questions.

4. Don't ask HR questions.

5. Don't ask Project questions.

6. Don't ask Coding questions.

7. Maximum 25 words.

8. Company level interview.

Examples:

Topic = HTML

Question:
What is semantic HTML?

--------------------

Topic = CSS

Question:
Difference between Flexbox and Grid?

--------------------

Topic = JavaScript

Question:
Explain Event Loop.

--------------------

Topic = React

Question:
What is Virtual DOM?

--------------------

Topic = Node.js

Question:
Why is Node.js single threaded?

--------------------

Topic = MongoDB

Question:
Difference between Embedded and Referenced documents?

Return ONLY question.
`;

    const response = await ai.models.generateContent({

        model: "gemini-flash-latest",

        contents: prompt

    });

    return typeof response.text === "function"
        ? response.text()
        : response.text;

};

module.exports = {

    generateTechnicalQuestion

};