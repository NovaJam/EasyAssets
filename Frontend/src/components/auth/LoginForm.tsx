import React, { useEffect, useState } from "react";
import { login } from "../../routes/authRoute";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

const LoginForm = () => {

  useEffect(() => {
    document.body.classList.add('errormt');

    return () => {
      document.body.classList.remove('errormt');
    }
  })
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
      <h2 className="text-2xl font-bold mb-4 text-purple-500">Log In</h2>

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
            placeholder="novadesigns@gmail.com"
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
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <NavLink to={"/resetPassword"}>
          <span className="underline-offset-1 underline">Forgot Password?</span>
        </NavLink>

        <button
          type="submit"
          className="w-full hover:bg-purple-900 text-white p-2 rounded-md mt-4 bg-purple-500  hover:border-r-black"
        >
          Log In
        </button>

        <a href="/signup">
          Don't have account?{" "}
          <span className="underline-offset-1 underline">Signup</span>
        </a>
      </form>
    </div>
  );
};

export default LoginForm;
