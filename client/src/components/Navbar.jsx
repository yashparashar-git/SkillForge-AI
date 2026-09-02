
import { Link } from "react-router-dom";
import "./../styles/Navbar.css";

function Navbar() {

    return (
        <nav className="navbar">

            <div className="logo">
                SkillForge AI
            </div>

            <div className="nav-links">

                <a href="#home">Home</a>

                <a href="#features">Features</a>

                <a href="#HowItWorks">About</a>

                <a href="#contact">Contact</a>

                <Link to="/login">
                    <button className="login-btn">
                        Login
                    </button>
                </Link>

            </div>

        </nav>
    );
}

export default Navbar;  
