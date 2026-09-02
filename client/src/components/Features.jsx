import "../styles/Features.css";

function Features() {
  return (
    <section className="features">

      <p className="section-tag">
        WHY SKILLFORGE AI
      </p>

      <h2>
        Everything You Need To
        <span> Crack Your Dream Job</span>
      </h2>

      <div className="feature-grid">

        <div className="feature-card">

          <div className="icon">📄</div>

          <h3>AI Resume Analyzer</h3>

          <p>
            Upload your resume and receive ATS score,
            detailed feedback and personalized
            improvement suggestions.
          </p>

        </div>

        {/* <div className="feature-card">

          <div className="icon">💻</div>

          <h3>AI DSA Coach</h3>

          <p>
            Learn DSA from beginner to advanced with
            AI generated explanations, hints and coding
            practice.
          </p>

        </div> */}

        <div className="feature-card">

          <div className="icon">🎤</div>

          <h3>AI Interview Coach</h3>

          <p>
            Practice HR and Technical interviews with
            AI generated questions and instant feedback.
          </p>

        </div>

      </div>

    </section>
  );
}

export default Features;
