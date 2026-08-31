import "../../styles/interview/InterviewRightPanel.css";

function RightPanel({
    role,
    difficulty,
    totalQuestions,

    setRole,
    setDifficulty,
    setTotalQuestions,

    onStartInterview,
    loading,

    currentQuestion,
    stage,

    liveScore,
    technicalScore,
    communicationScore,
    confidenceScore,
sessionTime,
    sessionActive
}) {

    console.log("🔥 RIGHT PANEL SCORE:", liveScore);
    const formatTime = (seconds) => {

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")} : ${String(
        remainingSeconds
    ).padStart(2, "0")}`;
};
    return (
        <div className="interview-right-panel">

            {/* =========================
                INTERVIEW SETUP
            ========================= */}

            <div className="interview-right-card">

                <h3>Interview Setup</h3>

                <label>Role</label>

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    disabled={loading}
                >
                    <option value="MERN Developer">
                        MERN Developer
                    </option>

                    <option value="Java Developer">
                        Java Developer
                    </option>

                    <option value="Backend Developer">
                        Backend Developer
                    </option>

                    <option value="Frontend Developer">
                        Frontend Developer
                    </option>
                </select>


                <label>Difficulty</label>

                <select
                    value={difficulty}
                    onChange={(e) =>
                        setDifficulty(e.target.value)
                    }
                    disabled={loading}
                >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>


                <label>Total Questions</label>

                <select
                    value={totalQuestions}
                    onChange={(e) =>
                        setTotalQuestions(
                            Number(e.target.value)
                        )
                    }
                    disabled={loading}
                >
                    <option value={5}>5 Questions</option>
                    <option value={10}>10 Questions</option>
                    <option value={15}>15 Questions</option>
                </select>


                <button
                    className="interview-start-btn"
                    onClick={onStartInterview}
                    disabled={loading}
                >
                    {loading
                        ? "Starting..."
                        : "Start Interview"}
                </button>

            </div>


            {/* =========================
                PROGRESS
            ========================= */}

            <div className="interview-right-card">

                <h3>Progress</h3>

                <div className="interview-progress-bar">

                    <div
                        className="interview-progress-fill"
                        style={{
                            width:
                                totalQuestions > 0
                                    ? `${(
                                        currentQuestion /
                                        totalQuestions
                                    ) * 100}%`
                                    : "0%"
                        }}
                    ></div>

                </div>

                <p>
                    Question {currentQuestion || 0} /{" "}
                    {totalQuestions}
                </p>

            </div>


            {/* =========================
                LIVE SCORE
            ========================= */}

            <div className="interview-right-card">

                <h3>Live Score</h3>

                <div className="interview-score-box">

                    <h1>{liveScore}</h1>

                    <span>/100</span>

                </div>


                {/* Confidence */}

                <div className="interview-mini-score">

                    <span>Confidence</span>

                    <div className="mini-score-bar">

                        <div
                            style={{
                                width: `${confidenceScore}%`
                            }}
                        ></div>

                    </div>

                </div>


                {/* Technical */}

                <div className="interview-mini-score">

                    <span>Technical</span>

                    <div className="mini-score-bar">

                        <div
                            style={{
                                width: `${technicalScore}%`
                            }}
                        ></div>

                    </div>

                </div>


                {/* Communication */}

                <div className="interview-mini-score">

                    <span>Communication</span>

                    <div className="mini-score-bar">

                        <div
                            style={{
                                width: `${communicationScore}%`
                            }}
                        ></div>

                    </div>

                </div>

            </div>


            {/* =========================
                SESSION
            ========================= */}

            <div className="interview-right-card">

    <h3>Session</h3>

    <p>
        ⏱ {sessionActive ? formatTime(sessionTime) : "00 : 00"}
    </p>

    <p>
        {sessionActive
            ? "🟢 Session Active"
            : "⚪ Session Not Started"}
    </p>

    <p>🎤 Voice Ready</p>

    <p>🤖 Jarvis Online</p>

    <p>
        📌 {stage || "Not Started"}
    </p>

</div>

   {/* =========================
                BUTTONS
            ========================= */}

            <div className="interview-right-buttons">

                <button
                    className="restart"
                    onClick={onStartInterview}
                    disabled={loading}
                >
                    Restart
                </button>

                <button
                    className="exit"
                    onClick={() => {
                        window.history.back();
                    }}
                >
                    Exit
                </button>

            </div>

        </div>
    );
}

export default RightPanel;