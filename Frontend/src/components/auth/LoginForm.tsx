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
      <h1 className="font-semibold text-4xl text-center text-gray-600">EasyAssets</h1>
      <div className="mb-9 mt-6 space-y-1.5">
        <h1 className="text-2xl font-semibold">Log in to your account</h1>
        <p className="text-zinc-400">
          Don't have an account?{" "}
          <a href="signup" className="text-blue-400">
            Create one.
          </a>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="text-gray-800 block text-lg font-medium mb-2 ">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="text-gray-800 block text-lg font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="********"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-white transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70 mt-4"
        >
          Log In
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default LoginForm;
