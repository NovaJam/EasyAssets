import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import IssueTrackerDashboard from "./pages/IssueTracker/IssueTrackerDashboard";
import SecurityQn from "./components/auth/SecurityQn";
import ResetPassword from "./pages/auth/ResetPassword";
import AssetManagement from "./pages/admin/AssetManagement";
import Sidebar from "./components/Sidebar";
// import { useAuth } from "./hooks/useAuth";
import { AuthProvider } from "./context/AuthContext";

// const LoginSimulator = () => {
//   const { login, user, logouts } = useAuth();
//   return (
//     <div className="p-4">
//       <button
//         onClick={() => login({ id: "1", role: "Admin" })}
//         className="mr-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
//       >
//         Login as Admin
//       </button>
//       <button
//         onClick={() => login({ id: "2", role: "User" })}
//         className="bg-green-500 text-white px-4 py-2 rounded"
//       >
//         Login as User
//       </button>
//     </div>
//   );
// };
function App() {
  return (
//     <BrowserRouter>
//       <Routes>
//       <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/dashboard" element = {<Dashboard/>}/>
//         <Route path="/issue-tracker" element={<IssueTrackerDashboard/>}/>
//         <Route path="/security-check" element={<SecurityQn/>}/>
//         <Route path="/resetPassword" element={<ResetPassword/>}/>
//       </Routes>
//     </BrowserRouter>
    <AuthProvider>
      <BrowserRouter>
        {/* <LoginSimulator /> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<Sidebar />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/issue-tracker" element={<IssueTrackerDashboard />} />
            <Route path="/asset-management" element={<AssetManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
