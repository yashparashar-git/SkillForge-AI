import "../styles/how.css";

function HowItWorks() {

  return (

    <section className="sf-how-wrap">

      <p className="sf-how-tag">
        HOW IT WORKS
      </p>

      <h2 className="sf-how-title">
        Only Two Steps To
        <span className="sf-how-title-glow"> Land Your Dream Job</span>
      </h2>

      <div className="sf-how-list">

        <div className="sf-how-item">

          <div className="sf-how-badge">1</div>

          <h3 className="sf-how-item-title">Upload Resume</h3>

          <p className="sf-how-item-desc">
            Upload your PDF resume securely.
            Our AI reads every section instantly.
          </p>

        </div>

        <div className="sf-how-item">

          <div className="sf-how-badge">2</div>

          <h3 className="sf-how-item-title">AI Analysis</h3>

          <p className="sf-how-item-desc">
            Receive ATS Score,
            Missing Skills,
            Strengths,
            Weaknesses,
            and Improvement Suggestions.
          </p>

        </div>

        <div className="sf-how-item">

          <div className="sf-how-badge">3</div>

          <h3 className="sf-how-item-title">Become Job Ready</h3>

          <p className="sf-how-item-desc">
            Improve Resume,
            Practice DSA,
            Prepare Interviews
            using AI Coaches.
          </p>

        </div>

      </div>

    </section>

  );

}

export default HowItWorks;
