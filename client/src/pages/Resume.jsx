// import { useState } from "react";
// import { useEffect } from "react";
import React, { useState, useEffect } from "react";
import API from "../services/api";
import "../styles/resume.css";

function Resume() {
  const [file, setFile] = useState(null);

const [loading, setLoading] = useState(false);

const [analysis, setAnalysis] = useState(null);
const [chatInput, setChatInput] = useState("");

const [messages, setMessages] = useState([
{
sender:"ai",
text:"👋 Hi! I'm your AI Resume Coach. Ask me anything about your resume."
}
]);
const [reports, setReports] = useState([]);
const [showHistory, setShowHistory] = useState(false);
const [question, setQuestion] = useState("");
//chatbot connecting

const [chat, setChat] = useState([
  {
    role: "ai",
    text: "👋 Hi! I'm your AI Resume Coach. Ask me anything about your resume."
  }
]);
//analyze pdf 
const handleAnalyze = async () => {

    if (!file) {

        alert("Please select a PDF");

        return;

    }

    try {

        setLoading(true);

        const formData = new FormData();

        formData.append("resume", file);

        const token = localStorage.getItem("token");

        const res = await API.post(

            "/resume/upload",

            formData,

            {

                headers: {

                    Authorization: `Bearer ${token}`,

                    "Content-Type": "multipart/form-data"

                }

            }

        );

        setAnalysis(res.data.aiAnalysis);
        fetchReports();

        alert("Resume analyzed successfully");

    }

    catch (err) {

        alert(err.response?.data?.message || "Upload Failed");

    }

    finally {

        setLoading(false);

    }

};


//prvious reports 
const fetchReports = async () => {

    try {

        const token = localStorage.getItem("token");

        const res = await API.get("/resume/history", {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        setReports(res.data.reports);

    }

    catch (error) {

        console.log(error);

    }
    const token = localStorage.getItem("token");

console.log("TOKEN =", token);

};
//this code stop unnessery api calll
useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
        fetchReports();
    }

}, []);
//chatbotfunction
const handleAskAI = async () => {

  if (!question.trim()) return;

  const userMessage = {
    role: "user",
    text: question
  };

  setChat((prev) => [...prev, userMessage]);

  try {

    const token = localStorage.getItem("token");

    const res = await API.post(

      "/chat/resume",

      {
        question
      },

      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

    );

    const aiMessage = {

      role: "ai",

      text: res.data.answer

    };

    setChat((prev) => [...prev, aiMessage]);

    setQuestion("");

  }

  catch (err) {

    alert(err.response?.data?.message || "AI Error");

  }

};
const healthItems = [
  {
    key: "contactDetails",
    label: "Contact Details"
  },
  {
    key: "skills",
    label: "Skills"
  },
  {
    key: "education",
    label: "Education"
  },
  {
    key: "projects",
    label: "Projects"
  },
  {
    key: "experience",
    label: "Experience"
  },
  {
    key: "achievements",
    label: "Achievements"
  },
  {
    key: "github",
    label: "GitHub"
  },
  {
    key: "linkedin",
    label: "LinkedIn"
  }
];

  return (
    <div className="resume-container">

      <div className="resume-header">
        <div>
          <h1>🤖 Resume AI Agent</h1>
          <p>
            Upload your resume and let AI analyze your ATS score,
            missing skills, strengths and career roadmap.
          </p>
        </div>

        {/* <button
className="history-btn"
onClick={() => setShowHistory(true)}
>
Previous Reports
</button>     */}
<button
className="history-btn"
onClick={() => {

    console.log("Button Clicked");

    console.log(reports);

    setShowHistory(true);

}}
>
Previous Reports
</button>
  </div>

      <div className="resume-grid">

        {/* LEFT */}

        <div className="left-panel">

       <div className="agent-card">

  <h2>🤖 AI Resume Coach</h2>

  <p>
    Upload your resume first.
    Then ask me anything about your resume.
  </p>

  <div className="chat-window">

    {

      chat.map((msg, index) => (

        <div
          key={index}
          className={
            msg.role === "user"
              ? "chat-message user"
              : "chat-message ai"
          }
        >

          {msg.text}

        </div>

      ))

    }

  </div>

  <div className="chat-input">

    <input
      type="text"
      placeholder="Ask anything..."
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
    />

    <button
      onClick={handleAskAI}
    >
      Send
    </button>

  </div>

</div>

          <div className="upload-card">

            <h3>Upload Resume</h3>

            <div className="upload-box">

              <div className="upload-icon">

                📄

              </div>

              <h4>

                Drag & Drop Resume

              </h4>

              <span>

                or Browse PDF

              </span>

              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
              />

            </div>

            {file && (

              <div className="selected-file">

                ✅ {file.name}

              </div>

            )}

            <button

className="analyze-btn"

onClick={handleAnalyze}

>

{loading ? "Analyzing..." : "Analyze Resume"}

</button>
          </div>

        </div>

        {/* RIGHT */}

        <div className="right-panel">

          <div className="analysis-header">

            <div>

              <h2>Live AI Analysis</h2>

              <p>

            {analysis?.summary || "Waiting for resume..."}

             </p>

            </div>

            <div className="status">

              🟢 AI Ready

            </div>

          </div>

          <div className="cards">

            <div className="score-card">

              <h3>ATS Score</h3>

              <div className="score-circle">

                {analysis?.atsScore || 0}

                <span>/100</span>

              </div>

            </div>
            <div className="health-card">

  <h3>Resume Health</h3>

  <ul>

    {healthItems.map((item) => {

      const isPresent =
        analysis?.resumeHealth?.[item.key];

      return (
        <li key={item.key}>

          <span>
            {isPresent ? "✅" : "❌"}
          </span>

          <span>
            {item.label}
          </span>

          {!isPresent && analysis && (
            <small className="health-missing">
              Missing
            </small>
          )}

        </li>
      );

    })}

  </ul>

</div>
            <div className="box">

              <h3>Strengths</h3>

             <ul>

{

analysis?.strengths?.map((item,index)=>(

<li key={index}>{item}</li>

))

}

</ul>

            </div>

            <div className="box">

              <h3>Mistakes Found</h3>

            <ul>

{

analysis?.weaknesses?.map((item,index)=>(

<li key={index}>{item}</li>

))

}

</ul>

            </div>

            <div className="box">

              <h3>Missing Skills</h3>

              <ul>

{

analysis?.missingSkills?.map((item,index)=>(

<li key={index}>{item}</li>

))

}

</ul>
            </div>

            <div className="box">

              <h3>AI Suggestions</h3>

              <ul>

{

analysis?.suggestions?.map((item,index)=>(

<li key={index}>{item}</li>

))

}

</ul>

            </div>

            <div className="roadmap">

  <h3>AI Career Roadmap</h3>

  <div className="steps">

    {analysis?.careerRoadmap?.length > 0 ? (

      analysis.careerRoadmap.map((skill, index) => (

        <React.Fragment key={index}>

          <span>{skill}</span>

          {index < analysis.careerRoadmap.length - 1 && (
            <span>→</span>
          )}

        </React.Fragment>

      ))

    ) : (

      <span>
        Upload and analyze your resume to generate your roadmap.
      </span>

    )}

  </div>

</div>
           

          </div>

        </div>

      </div>
      {showHistory && (

<div className="history-modal">

<div className="history-box">

<div className="history-header">

<h2>📄 Previous Reports</h2>

<button onClick={() => setShowHistory(false)}>✖</button>

</div>

{

reports.length === 0 ?

(

<p>No reports found.</p>

)

:

(

reports.map((report) => (

<div className="history-card" key={report._id}>

<h3>{report.originalName}</h3>

<p>

ATS Score : {report.aiAnalysis?.atsScore}

</p>

<p>

Uploaded :

{

new Date(report.createdAt).toLocaleDateString()

}

</p>

</div>

))

)

}

</div>

</div>

)}
      

    </div>
    
    
    
  );
 
}

export default Resume;