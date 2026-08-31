import "../../styles/interview/interviewNavbar.css";
import { downloadInterviewReport } from "../../services/interviewApi";

function Navbar({ interviewId,user}) {

    const handleDownloadReport = async () => {

        if (!interviewId) {
            alert("Please start the interview first.");
            return;
        }

        try {

            await downloadInterviewReport(interviewId);

        } catch (error) {

            console.error(
                "Download Report Error:",
                error
            );

            alert(error.message);

        }

    };

    return (
        <header className="interview-navbar">

            <div className="interview-navbar-left">

                <img
                    src="/robot.png"
                    alt="Robot"
                    className="interview-navbar-logo"
                />

                <div>

                    <h2 className="interview-navbar-title">
                        AI Interview Agent
                    </h2>

                    <p className="interview-navbar-subtitle">
                        Your Personal Interview Coach
                    </p>

                </div>

            </div>

            <div className="interview-navbar-right">

                <button
                    className="interview-download-btn"
                    onClick={handleDownloadReport}
                >
                    📥 Download Report
                </button>

                <button className="interview-student-btn">
                    🎓 Student Panel
                </button>

                <button className="interview-notification-btn">
                    🔔
                </button>

                {/* <div className="interview-user-card">

                    <div className="interview-user-avatar">
                        Y
                    </div>

                    <div>
                        <h4>Yash</h4>
                        <span>{user?.name || "Student"}</span>
                    </div>

                </div> */}
                <div className="interview-user-card">

    <div className="interview-user-avatar">
        {user?.name
            ? user.name.charAt(0).toUpperCase()
            : "S"}
    </div>

    <div>
        <h4>
            {user?.name || "Student"}
        </h4>

        <span>
            BCA Student
        </span>
    </div>

</div>

            </div>

        </header>
    );
}

export default Navbar;