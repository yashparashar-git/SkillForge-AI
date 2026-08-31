import { Link, useNavigate } from "react-router-dom";
import { getInterviewStats } from "../services/interviewApi";
import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/dashboard.css";

function Dashboard() {
const [resumeReports, setResumeReports] = useState([]);
const [dashboardLoading, setDashboardLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [interviewStats, setInterviewStats] = useState({
    totalInterviews: 0
});
 
useEffect(() => {

    const loadDashboardData = async () => {

        try {

            const loggedUser = JSON.parse(
                localStorage.getItem("user")
            );

            setUser(loggedUser);

            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            // =========================
            // RESUME HISTORY
            // =========================

            const resumeResponse = await API.get(
                "/resume/history",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(
                "📄 Dashboard Resume Data:",
                resumeResponse.data
            );

            setResumeReports(
                resumeResponse.data.reports || []
            );


            // =========================
            // INTERVIEW STATS
            // =========================

            const interviewResponse =
                await getInterviewStats();

            console.log(
                "🎤 Dashboard Interview Data:",
                interviewResponse
            );

            setInterviewStats(
                interviewResponse
            );


        } catch (error) {

            console.error(
                "Dashboard Data Error:",
                error
            );

        } finally {

            setDashboardLoading(false);

        }

    };

    loadDashboardData();

}, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };
    const averageResumeScore =
    resumeReports.length > 0
        ? Math.round(
            resumeReports.reduce(
                (total, report) =>
                    total +
                    (report.aiAnalysis?.atsScore || 0),
                0
            ) / resumeReports.length
        )
        : 0;
    // =========================
// DYNAMIC SKILLS ANALYZED
// =========================

const analyzedSkills = new Set();

resumeReports.forEach((report) => {

    const skills =
        report.aiAnalysis?.skills || [];

    skills.forEach((skill) => {

        if (skill && typeof skill === "string") {
            analyzedSkills.add(skill.trim().toLowerCase());
        }

    });

});

const skillsAnalyzed = analyzedSkills.size;



    return (
        <div className="sf-dashboard">

            {/* =========================
                SIDEBAR
            ========================= */}

            <aside className="sf-sidebar">

                <div className="sf-logo">
                    SkillForge <span>AI</span>
                </div>

                <nav className="sf-sidebar-nav">

                    <Link
                        to="/dashboard"
                        className="sf-nav-item sf-nav-active"
                    >
                        <span>🏠</span>
                        Dashboard
                    </Link>

                    <Link
                        to="/resume"
                        className="sf-nav-item"
                    >
                        <span>📄</span>
                        Resume Agent
                    </Link>

                    <Link
                        to="/interview"
                        className="sf-nav-item"
                    >
                        <span>🎤</span>
                        Interview Coach
                    </Link>

                    <Link
                        to="/profile"
                        className="sf-nav-item"
                    >
                        <span>👤</span>
                        Profile
                    </Link>

                    <Link
                        to="/settings"
                        className="sf-nav-item"
                    >
                        <span>⚙️</span>
                        Settings
                    </Link>

                </nav>

                <button
                    className="sf-logout-btn"
                    onClick={handleLogout}
                >
                    <span>🚪</span>
                    Logout
                </button>

            </aside>

 
            {/* =========================
                MAIN CONTENT
            ========================= */}

            <main className="sf-main">

                {/* TOP BAR */}

                <header className="sf-topbar">

                    <div className="sf-search-wrapper">

                        <span>⌕</span>

                        <input
                            type="text"
                            placeholder="Search SkillForge AI..."
                        />

                    </div>

                    <div className="sf-topbar-right">

                        <button className="sf-notification">
                            🔔
                        </button>

                        <div className="sf-profile-mini">

                            <div className="sf-avatar">
                                {user?.name
                                    ? user.name.charAt(0).toUpperCase()
                                    : "Y"}
                            </div>

                            <div className="sf-mini-info">
                                <strong>
                                    {user?.name || "Student"}
                                </strong>

                                <span>
                                    BCA Student
                                </span>
                            </div>

                        </div>

                    </div>

                </header>


                {/* =========================
                    WELCOME CARD
                ========================= */}

                <section className="sf-welcome-card">

                    <div className="sf-welcome-content">

                        <span className="sf-welcome-small">
                            YOUR AI CAREER ASSISTANT
                        </span>

                        <h1>
                            Welcome back,{" "}
                            {user?.name || "Student"} 👋
                        </h1>

                        <p>
                            Continue building your career
                            with SkillForge AI.
                        </p>

                    </div>

                    <div className="sf-welcome-robot">
                        🤖
                    </div>

                </section>


                {/* =========================
                    STAT CARDS
                ========================= */}

                <section className="sf-stats-grid">

                    <div className="sf-stat-card">

                        <div className="sf-stat-icon">
                            📄
                        </div>

                        <div>
                            <span>Resume Analysis</span>
                            {/* <strong>3</strong> */}
                            <strong>
                             {resumeReports.length}
                           </strong>
                        </div>

                    </div>


                    <div className="sf-stat-card">

                        <div className="sf-stat-icon">
                            🎤
                        </div>

                        <div>
                            <span>Interviews</span>
                            <strong>{interviewStats.totalInterviews}</strong>
                        </div>

                    </div>


                    <div className="sf-stat-card">

                        <div className="sf-stat-icon">
                            ⭐
                        </div>

                        <div>
                            <span>Average Score</span>
                            {/* <strong>78%</strong> */}
                            <strong>{averageResumeScore}%</strong>
                        </div>

                    </div>


                    <div className="sf-stat-card">

                        <div className="sf-stat-icon">
                            💡
                        </div>

                        <div>
                            <span>Skills Analyzed</span>
                            <strong>{skillsAnalyzed}</strong>
                        </div>

                    </div>

                </section>


                {/* =========================
                    AI CAREER AGENTS
                ========================= */}

                <section className="sf-agents-section">

                    <div className="sf-section-heading">

                        <div>
                            <span className="sf-section-label">
                                EXPLORE YOUR TOOLS
                            </span>

                            <h2>
                                AI Career Agents
                            </h2>
                        </div>

                    </div>


                    <div className="sf-agent-grid">

                        {/* Resume Agent */}

                        <Link
                            to="/resume"
                            className="sf-agent-card"
                        >

                            <div className="sf-agent-top">

                                <div className="sf-agent-icon">
                                    📄
                                </div>

                                <span className="sf-agent-arrow">
                                    →
                                </span>

                            </div>

                            <h3>
                                Resume Agent
                            </h3>

                            <p>
                                Analyze your resume and get
                                AI-powered suggestions to
                                improve your profile.
                            </p>

                            <span className="sf-agent-link">
                                Analyze Resume →
                            </span>

                        </Link>


                        {/* Interview Coach */}

                        <Link
                            to="/interview"
                            className="sf-agent-card"
                        >

                            <div className="sf-agent-top">

                                <div className="sf-agent-icon">
                                    🎤
                                </div>

                                <span className="sf-agent-arrow">
                                    →
                                </span>

                            </div>

                            <h3>
                                Interview Coach
                            </h3>

                            <p>
                                Practice AI-powered interviews,
                                improve your answers and track
                                your performance.
                            </p>

                            <span className="sf-agent-link">
                                Start Interview →
                            </span>

                        </Link>

                    </div>

                </section>


                {/* =========================
                    QUICK ACTIONS
                ========================= */}

                <section className="sf-quick-section">

                    <h2>
                        Quick Actions
                    </h2>

                    <div className="sf-quick-grid">

                        <Link
                            to="/resume"
                            className="sf-quick-card"
                        >
                            <span>📄</span>
                            <div>
                                <strong>
                                    Analyze Resume
                                </strong>

                                <small>
                                    Get AI feedback
                                </small>
                            </div>
                        </Link>


                        <Link
                            to="/interview"
                            className="sf-quick-card"
                        >
                            <span>🎤</span>
                            <div>
                                <strong>
                                    Practice Interview
                                </strong>

                                <small>
                                    Start a mock interview
                                </small>
                            </div>
                        </Link>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default Dashboard;