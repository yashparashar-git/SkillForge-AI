const API_URL = "https://skillforge-ai-backend-mxmw.onrender.com/api/interview";

// GET TOKEN
const getToken = () => {
    return localStorage.getItem("token");
};

// START INTERVIEW
export const startInterview = async ({
    role,
    difficulty,
    totalQuestions
}) => {

    const token = getToken();

    if (!token) {
        throw new Error("User is not logged in");
    }

    const response = await fetch(
        `${API_URL}/start`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify({
                role,
                difficulty,
                totalQuestions
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to start interview"
        );
    }

    return data;
};

// SUBMIT ANSWER
export const submitInterviewAnswer = async ({
    interviewId,
    answer
}) => {

    const token = getToken();

    if (!token) {
        throw new Error("User is not logged in");
    }

    const response = await fetch(
        `${API_URL}/answer`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify({
                interviewId,
                answer
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to submit answer"
        );
    }

    return data;
};
export const getInterviewReport = async (interviewId) => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `https://skillforge-ai-backend-mxmw.onrender.com/api/interview/report/${interviewId}`,
        {
            method: "GET",

            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch interview report"
        );
    }

    return data;
};
// DOWNLOAD INTERVIEW REPORT
export const downloadInterviewReport = async (interviewId) => {

    const token = getToken();

    if (!token) {
        throw new Error("User is not logged in");
    }

    const response = await fetch(
        `${API_URL}/report/${interviewId}/download`,
        {
            method: "GET",

            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {

        let data;

        try {
            data = await response.json();
        } catch {
            data = {};
        }

        throw new Error(
            data.message || "Failed to download interview report"
        );
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "Interview_Report.pdf";

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);
};


export const getInterviewStats = async () => {

    const token = getToken();

    if (!token) {
        throw new Error("User is not logged in");
    }

    const response = await fetch(
        `${API_URL}/dashboard-stats`,
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch interview stats"
        );
    }

    return data;
};
// ==============================
// END INTERVIEW
// ==============================

export const endInterview = async (interviewId) => {

    const token = getToken();

    if (!token) {
        throw new Error("User is not logged in");
    }

    const response = await fetch(
        `${API_URL}/end/${interviewId}`,
        {
            method: "POST",

            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to end interview"
        );
    }

    return data;
};


// ==============================
// SKIP QUESTION
// ==============================

export const skipInterviewQuestion = async (interviewId) => {

    const token = getToken();

    if (!token) {
        throw new Error("User is not logged in");
    }

    const response = await fetch(
        `${API_URL}/skip`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify({
                interviewId
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to skip question"
        );
    }

    return data;
};
