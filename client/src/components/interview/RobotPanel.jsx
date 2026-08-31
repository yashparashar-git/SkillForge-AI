import "../../styles/interview/interviewRobot.css";

function RobotPanel(){

    return(

        <div className="interview-robot-panel">

            <div className="interview-robot-circle">

                <img

                    src="/robot.png"

                    alt="Jarvis"

                    className="interview-robot-image"

                />

            </div>

            <h2 className="interview-robot-name">

                Jarvis AI

            </h2>

            <p className="interview-robot-role">

                Senior Technical Interviewer

            </p>

            <div className="interview-robot-status">

                <span className="interview-online-dot"></span>

                Online

            </div>

            <div className="interview-speaking-animation">

                <span></span>

                <span></span>

                <span></span>

                <span></span>

                <span></span>

            </div>

            <div className="interview-robot-info">

                <div>

                    <h4>Stage</h4>

                    <span>Resume</span>

                </div>

                <div>

                    <h4>Question</h4>

                    <span>1 / 10</span>

                </div>

                <div>

                    <h4>Voice</h4>

                    <span>Enabled</span>

                </div>

            </div>

        </div>

    );

}

export default RobotPanel;