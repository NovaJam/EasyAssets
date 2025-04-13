import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import IssueTrackerDashboard from "./pages/IssueTracker/IssueTrackerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/issue-tracker" element={<IssueTrackerDashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
