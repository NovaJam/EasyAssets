import React, { useState } from "react";
import { login } from "../../routes/authRoute";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  // Handle form submission with basic validation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and Password are required.");
      return;
    }

    setError(""); // Clear error if everything is valid

    // Make a login request to the backend
    try {
      const response = await login(email, password);
      console.log("Login successful", response); // Handle successful login response
      navigate("/user-landing");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const backendMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      setError(backendMessage);
      console.error("Login error:", error);
    }
  };
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Log In</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <a href="/signup">
          Don't have account?{" "}
          <span className="underline-offset-1 underline">Signup</span>
        </a>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md mt-4"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
