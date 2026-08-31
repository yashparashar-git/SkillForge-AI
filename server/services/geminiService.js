const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const PRIMARY_MODEL = "gemini-3.6-flash";
const FALLBACK_MODEL = "gemini-3.5-flash-lite";

const sleep = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));


const analyzeResume = async (resumeText) => {

    const maxRetries = 3;

    const prompt = `
You are an expert ATS Resume Analyzer.

Analyze the following resume carefully.

Return ONLY valid JSON.

Use exactly this structure:

{
  "atsScore": 0,
  "summary": "",
  "skills": [],
  "resumeHealth": {
    "contactDetails": false,
    "skills": false,
    "education": false,
    "projects": false,
    "experience": false,
    "achievements": false,
    "github": false,
    "linkedin": false
  },
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "suggestions": [],
  "careerRoadmap": []
}

RULES:

1. atsScore:
- Number between 0 and 100.
- Consider ATS readability, skills, projects, education, experience and completeness.

2. summary:
- 2-3 sentences.
- Give a short overall evaluation.

3. skills:
- Return only skills clearly found in the resume.
- Do not include missing skills.
- Avoid duplicates.

4. resumeHealth:
- Return true only when clearly present.
- Otherwise false.

5. strengths:
- Return 4-6 actual strengths.

6. weaknesses:
- Return 3-5 actual weaknesses.

7. missingSkills:
- Suggest useful skills missing for the candidate's career direction.
- Do not include skills already present.

8. suggestions:
- Return 4-6 actionable improvements.

9. careerRoadmap:
- Return 3-6 NEXT skills or technologies.
- Base them on current skills, projects, education, missing skills and career direction.
- Do not randomly suggest technologies.
- Do not include technologies already known.
- Return only short skill/technology names.

IMPORTANT:
- Return ONLY valid JSON.
- No markdown.
- No code fences.
- No explanation outside JSON.
- Boolean values must be true or false.

Resume:

${resumeText}
`;

    // ==========================================
    // PRIMARY MODEL
    // ==========================================

    for (let attempt = 1; attempt <= maxRetries; attempt++) {

        try {

            console.log(
                `🤖 Primary Gemini - Attempt ${attempt}`
            );

            const response =
                await ai.models.generateContent({

                    model: PRIMARY_MODEL,

                    contents: prompt

                });

            console.log(
                `✅ Primary Gemini Successful - Attempt ${attempt}`
            );

            return response.text;

        } catch (error) {

            console.error(
                `❌ Primary Gemini Error - Attempt ${attempt}:`,
                error.status,
                error.message
            );

            const retryable =
                error.status === 503 ||
                error.status === 429 ||
                error.status === 500;

            if (!retryable) {
                throw error;
            }

            if (attempt < maxRetries) {

                const delay =
                    2000 * Math.pow(2, attempt - 1);

                console.log(
                    `🔄 Retrying primary model after ${delay}ms...`
                );

                await sleep(delay);
            }
        }
    }


    // ==========================================
    // FALLBACK MODEL
    // ==========================================

    console.log(
        "⚠️ Primary model unavailable."
    );

    console.log(
        `🔁 Switching to fallback model: ${FALLBACK_MODEL}`
    );


    try {

        const response =
            await ai.models.generateContent({

                model: FALLBACK_MODEL,

                contents: prompt

            });

        console.log(
            "✅ Fallback Gemini Successful"
        );

        return response.text;

    } catch (fallbackError) {

        console.error(
            "❌ Fallback Gemini Error:",
            fallbackError.status,
            fallbackError.message
        );

        throw new Error(
            "AI service is temporarily unavailable. Please try again in a moment."
        );
    }
};


module.exports = analyzeResume;