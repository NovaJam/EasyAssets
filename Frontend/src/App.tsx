import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import IssueTrackerDashboard from "./pages/IssueTracker/IssueTrackerDashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element = {<Dashboard/>}/>
        <Route path="/issue-tracker" element={<IssueTrackerDashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
