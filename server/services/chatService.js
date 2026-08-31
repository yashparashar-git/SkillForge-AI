
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};


const askResumeAI = async (resumeText, question) => {

    const prompt = `
You are a Senior Resume Coach, ATS Expert and Career Mentor.

You have access to the user's complete resume.

Resume:
${resumeText}

The user asked:
"${question}"

Instructions:

1. Use the resume as your primary context.

2. Answer in a very short and clear way.

3. Explain the answer in maximum 1-2 points.

4. Each point should be short and practical.

5. If the user asks how to improve the resume, give practical ATS-friendly suggestions.

6. If information is missing, explain what should be added.

7. If the question is about skills, projects, internships, ATS score, career roadmap or interview preparation, use the resume and relevant industry best practices.

8. Do not give long paragraphs.

9. Do not repeat the complete resume.

10. End with one short actionable tip.

Example format:

• Point 1: Short explanation.
• Point 2: Short explanation.

Actionable tip: One short useful tip.
`;


    const models = [
        "gemini-3.6-flash",
        "gemini-3.5-flash-lite"
    ];


    for (const model of models) {

        for (let attempt = 1; attempt <= 2; attempt++) {

            try {

                console.log(
                    `🤖 Chat AI - Model: ${model} - Attempt: ${attempt}`
                );


                const response =
                    await ai.models.generateContent({

                        model,

                        contents: prompt

                    });


                console.log(
                    `✅ Chat AI Successful - Model: ${model} - Attempt: ${attempt}`
                );


                return response.text;


            } catch (error) {

                console.error(
                    `❌ Chat AI Error - Model: ${model} - Attempt: ${attempt}`,
                    error.message
                );


                const status = error?.status;


                // Retry only temporary server/capacity errors
                if (
                    status === 503 ||
                    status === 429 ||
                    status === 500
                ) {

                    if (attempt < 2) {

                        console.log(
                            "⏳ Temporary Gemini error. Retrying..."
                        );

                        await sleep(1500);

                        continue;
                    }

                }


                // Move to fallback model
                break;

            }

        }

    }


    throw new Error(
        "AI service is temporarily unavailable. Please try again in a few seconds."
    );

};


module.exports = askResumeAI;