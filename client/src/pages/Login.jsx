import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

const [email, setEmail] = useState("");

const [password, setPassword] = useState("");

//logged in dashboard
const handleLogin = async (e) => {

    e.preventDefault();

    try{

        const res = await API.post("/auth/login",{

            email,

            password

        });

        localStorage.setItem("token",res.data.token);

        localStorage.setItem("user",JSON.stringify(res.data.user));

        alert(res.data.message);

        navigate("/dashboard");

    }

    catch(err){

        alert(err.response?.data?.message || "Login Failed");

    }
    const res = await API.post("/auth/login", {
    email,
    password
});

console.log(res.data);

}
  return (
    <div className="login-page">

      <div className="login-card">

        <h1>Welcome Back 👋</h1>

        <p>Login to continue using SkillForge AI</p>

        <form onSubmit={ handleLogin }>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
             required

          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
onChange={(e)=>setPassword(e.target.value)}
required

          />

          <button type="submit">
            Login
          </button>

        </form>

        {/* <div className="bottom-text">

          Don't have an account?

          <span>Create Account</span>

        </div> */}
          <div className="bottom-text">

  Don't have an account?{" "}

  <Link to="/register">
    Create Account
  </Link>

</div>

<div className="forgot-password">

  <Link to="/forgot-password">
    Forgot Password?
  </Link>

</div>
      </div>

    </div>
  );
}

export default Login;