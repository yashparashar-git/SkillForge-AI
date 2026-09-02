import Navbar from "../components/Navbar";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import AIAgents from "../components/AIAgents";
import CTA from "../components/CTA";
// import Contact from "../components/Contact";
import Contact from "./Contact";
import Footer from "../components/Footer";

import "../styles/Landing.css";

function Landing() {

    return (
        <>

            <Navbar />

            {/* HOME */}
            <section
                className="hero"
                id="home"
            >

                <div className="blur blur1"></div>
                <div className="blur blur2"></div>

                <div className="hero-content">

                    <span className="badge">
                        🚀 AI Powered Career Platform
                    </span>

                    <h1>
                        Build Your Future
                        <br />
                        <span>With SkillForge AI</span>
                    </h1>

                    <p>
                        Analyze your Resume with AI, master DSA,
                        and crack technical interviews using your
                        personal AI Career Assistant.
                    </p>

                    <div className="hero-btns">

                        <button className="primary-btn">
                            Get Started
                        </button>

                        <button className="secondary-btn">
                            Watch Demo
                        </button>

                    </div>

                </div>

            </section>


            {/* FEATURES */}
            <section id="features">
                <Features />
            </section>


            {/* HOW IT WORKS */}
            <HowItWorks />


            {/* AI AGENTS */}
            <AIAgents />


            {/* CTA */}
            <CTA />


            {/* CONTACT */}
            <section id="contact">
                <Contact />
            </section>


            <Footer />

        </>
    );
}

export default Landing;
