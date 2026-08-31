import { Link,useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import { useState } from "react";
import API from "../services/api";

import "../styles/register.css";

function Register() {
  const navigate = useNavigate();

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const handleRegister = async (e) => {
  e.preventDefault();

  try {

    const res = await API.post("/auth/register", {

      name,

      email,

      password,

    });

    alert(res.data.message);

    navigate("/login");

  } catch (err) {

    alert(err.response?.data?.message || "Registration Failed");

  }

};
  return (
    <div className="register-page">

      <div className="register-card">

        <h1>Create Account 🚀 </h1>

        <p>Join SkillForge AI and build your career with AI.</p>

        <form onSubmit={handleRegister}>

          <div className="input-box">
            <User size={20} />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
             required
            />
          </div>

          <div className="input-box">
            <Mail size={20} />
            <input
              type="email"
              placeholder="Email Address"
                value={email}
               onChange={(e) => setEmail(e.target.value)}
             required
            />
          </div>

          <div className="input-box">
            <Lock size={20} />
            <input
              type="password"
              placeholder="Password"
               value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
          </div>

          <div className="input-box">
            <Lock size={20} />
            <input
              type="password"
              placeholder="Confirm Password"
            />
          </div>
            
            
          
          

          <button className="register-btn">
            Create Account
          </button>

        </form>

        <div className="login-link">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </div>
    
  );
  
}

export default Register;