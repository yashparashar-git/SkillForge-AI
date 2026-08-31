import { Link } from "react-router-dom";
import "../styles/forgotPassword.css";

function ForgotPassword() {
  return (
    <div className="forgot-page">
      <div className="forgot-card">

        <h1>Forgot Password?</h1>

        <p>Enter your email to receive reset instructions.</p>

        <input
          type="email"
          placeholder="Enter Email"
        />

        <button>
          Send Reset Link
        </button>

        <div className="back-login">
          <Link to="/login">
            Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;