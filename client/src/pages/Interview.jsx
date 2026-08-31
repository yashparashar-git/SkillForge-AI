import { useState, useEffect } from "react";
import {
    startInterview,
    getInterviewReport
} from "../services/interviewApi";
import Navbar from "../components/interview/intervieNavbar";
import RobotPanel from "../components/interview/RobotPanel";
import QuestionPanel from "../components/interview/QuestionPanel";
import RightPanel from "../components/interview/RightPanel";
import InterviewFeatures from "../components/interview/InterviewFeatures";

import "../styles/interview.css";

function Interview() {
    // ==============================
    // LOGGED USER
    // ==============================

    const [user, setUser] = useState(null);

    useEffect(() => {

        const loggedUser = JSON.parse(
            localStorage.getItem("user")
        );

        setUser(loggedUser);

    }, []);
    //live score
const [liveScore, setLiveScore] = useState(0);
console.log("🔥 PARENT SCORE:", liveScore);
const [technicalScore, setTechnicalScore] = useState(0);
const [communicationScore, setCommunicationScore] = useState(0);
const [confidenceScore, setConfidenceScore] = useState(0);    
    // ==============================
    // INTERVIEW STATES
    // ==============================

    const [interviewId, setInterviewId] = useState(null);

    const [question, setQuestion] = useState("");

    const [stage, setStage] = useState("");

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [totalQuestions, setTotalQuestions] = useState(10);

    const [role, setRole] = useState("MERN Developer");

    const [difficulty, setDifficulty] = useState("Medium");

    const [loading, setLoading] = useState(false);
    
// ==============================
// SESSION TIMER
// ==============================

const [sessionTime, setSessionTime] = useState(0);
const [sessionActive, setSessionActive] = useState(false);

// ==============================
// SESSION TIMER EFFECT
// ==============================

useEffect(() => {

    if (!sessionActive) {
        return;
    }

    const timer = setInterval(() => {

        setSessionTime((previousTime) => {
            return previousTime + 1;
        });

    }, 1000);

    return () => clearInterval(timer);

}, [sessionActive]);

    // ==============================
    // START INTERVIEW
    // ==============================
const handleStartInterview = async () => {

    try {

        setLoading(true);

        const data = await startInterview({
            role,
            difficulty,
            totalQuestions
        });

        console.log("Interview Started:", data);

        setInterviewId(data.interviewId);
        setQuestion(data.question);
        setStage(data.stage);
        setCurrentQuestion(data.currentQuestion);
        // Start session timer
setSessionTime(0);
setSessionActive(true);

    } catch (error) {

        console.error("Start Interview Error:", error);

        alert(error.message);

    } finally {

        setLoading(false);

    }

};
const handleDownloadReport = async () => {

    if (!interviewId) {
        alert("Please complete the interview first.");
        return;
    }

    try {

        const data = await getInterviewReport(interviewId);

        console.log("📄 INTERVIEW REPORT:", data);

    } catch (error) {

        console.error(
            "Report Error:",
            error
        );

        alert(error.message);

    }

};
// ==============================
// FORMAT SESSION TIME
// ==============================

const formatSessionTime = (seconds) => {

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
        remainingSeconds
    ).padStart(2, "0")}`;

};
    

    return (

        <div className="interview-page">

        {/* <Navbar interviewId={interviewId} /> */}
        <Navbar
    interviewId={interviewId}
    user={user}
/>  
      


            <div className="interview-container">


                <div className="interview-main">


                    <RobotPanel />
                    <QuestionPanel
    question={question}
    interviewId={interviewId}
    currentQuestion={currentQuestion}
    totalQuestions={totalQuestions}
    stage={stage}
    difficulty={difficulty}
    loading={loading}
    onEndInterview={() => {

    setSessionActive(false);

    setQuestion("");

    setStage("Completed");

}}

    onNextQuestion={(data) => {
        setQuestion(data.question);
        setCurrentQuestion(data.currentQuestion);
        setStage(data.stage);
    }}

    onLoading={setLoading}

    onLiveScoreChange={setLiveScore}

    onTechnicalScoreChange={
        setTechnicalScore
    }

    onCommunicationScoreChange={
        setCommunicationScore
    }

    onConfidenceScoreChange={
        setConfidenceScore
    }
/>
               <InterviewFeatures />

     
   </div>
   


                <RightPanel
    role={role}
    difficulty={difficulty}
    totalQuestions={totalQuestions}

    stage={stage}
    currentQuestion={currentQuestion}

    setRole={setRole}
    setDifficulty={setDifficulty}
    setTotalQuestions={
        setTotalQuestions
    }

    onStartInterview={
        handleStartInterview
    }

    loading={loading}

    liveScore={liveScore}

    technicalScore={
        technicalScore
    }

    communicationScore={
        communicationScore
    }

    confidenceScore={
        confidenceScore
    }
     sessionTime={sessionTime}
    // sessionStarted={sessionStarted}
    sessionActive={sessionActive}
/>


            </div>
            

        </div>
        

    );

}

export default Interview;