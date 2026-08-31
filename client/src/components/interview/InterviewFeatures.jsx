import "../../styles/interview/interviewFeatures.css";

function InterviewFeatures() {

    const features = [

        {
            icon: "🧠",
            title: "AI Powered",
            subtitle: "Smart Questions"
        },
        {
            icon: "⚡",
            title: "Real-time",
            subtitle: "Evaluation"
        },
        {
            icon: "🎙",
            title: "Voice Enabled",
            subtitle: "Interaction"
        },
        {
            icon: "📋",
            title: "Detailed",
            subtitle: "Feedback"
        },
        {
            icon: "📄",
            title: "PDF Report",
            subtitle: "Download"
        }

    ];

    return (

        <div className="interview-features">

            {features.map((item, index) => (

                <div className="interview-feature-card" key={index}>

                    <div className="interview-feature-icon">
                        {item.icon}
                    </div>

                    <div>
                        <h4>{item.title}</h4>
                        <p>{item.subtitle}</p>
                    </div>

                </div>

            ))}

        </div>

    );

}

export default InterviewFeatures;
