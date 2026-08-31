import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Resume from "./pages/Resume";
import Interview from "./pages/Interview";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Contact from "./pages/Contact";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />
        
        <Route path="/register" element={<Register/>}/>

          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/resume" element={<Resume />} />

          <Route path="/interview" element={<Interview />} />
           
           <Route path="/profile" element={<Profile />} />
           
           <Route path="/settings" element={<Settings />} />
           <Route
    path="/contact"
    element={<Contact />}
/>


      </Routes>

    </BrowserRouter>

  );

}

export default App;