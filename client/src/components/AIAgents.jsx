import "../styles/agents.css";

function AIAgents() {
  return (
    <section className="agents">

      <p className="section-tag">
        AI AGENTS
      </p>

      <h2>
        Meet Your
        <span> AI Career Assistants</span>
      </h2>

      <div className="agent-grid">

        <div className="agent-card">
          <div className="icon">📄</div>

          <h3>Resume Agent</h3>

          <p>
           ATS Score

, Resume Summary

Strengths,

 Weaknesses,

 Missing Skills,

Improvement Suggestions
          </p>
        </div>

        {/* <div className="agent-card">
          <div className="icon">💻</div>

          <h3>DSA Coach</h3>

          <p>
             Daily Problems,

 Java Practice,

 AI Hints,

 Coding Roadmap,

Progress Tracking
          </p>
        </div> */}

        <div className="agent-card">
          <div className="icon">🎤</div>

          <h3>Interview Coach</h3>

          <p>
           HR Interview,

Technical Interview,

 AI Feedback,

 Communication Score,

Mock Interview
          </p>
        </div>

      </div>

    </section>
  );
}

export default AIAgents;