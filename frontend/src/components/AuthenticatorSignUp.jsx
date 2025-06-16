import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

const API_BASE_URL = "http://localhost:8000/api";

const AuthenticatorSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/AuthenticatorLogin");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/register`, {
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      });

      console.log("Signup successful:", response.data);
      navigate("/");
    } catch (err) {
      const errors = err.response?.data?.errors;
      const errorMsg = errors
        ? Object.values(errors).flat().join(" ")
        : "Signup failed. Please try again.";
      console.error("Signup error:", err.response?.data || err.message);
      setError(errorMsg);
    }
  };

  const googleLogin = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/google-auth`, {
        access_token: tokenResponse.access_token, // ✅ send this to Laravel
      });

      console.log("Google login successful:", res.data);
      navigate("/"); // or wherever your home/dashboard is
    } catch (err) {
      console.error("Google login failed:", err.response?.data || err.message);
      setError("Google login failed. Try again.");
    }
  },
  onError: () => {
    setError("Google login was unsuccessful.");
  },
});


  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-opacity-70 bg-black p-8 rounded-xl shadow-lg w-96">
        <div className="flex justify-center mb-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg"
            alt="NASA Logo"
            className="w-24"
          />
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Name"
              className="w-full pl-10 pr-3 py-2 border rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-3 py-2 border rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-3 py-2 border rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full pl-10 pr-3 py-2 border rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-lg font-semibold transition"
          >
            Sign Up
          </button>
        </form>

        <button
          type="button"
          onClick={() => googleLogin()}
          className="mt-6 w-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-black py-2 rounded-lg text-lg font-semibold transition"
        >
          <svg
            className="w-6 h-6 mr-2"
            viewBox="0 0 533.5 544.3"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M533.5 278.4c0-17.5-1.5-34.3-4.7-50.7H272v95.9h146.8c-6.3 34-25 62.9-53.4 82.3v68.4h86.3c50.4-46.5 79.8-115 79.8-195.9z"
              fill="#4285F4"
            />
            <path
              d="M272 544.3c72.7 0 133.7-24.1 178.2-65.4l-86.3-68.4c-24 16.1-54.5 25.5-91.9 25.5-70.7 0-130.7-47.7-152.2-111.6H32.6v69.9c44.1 87.2 134.7 149.9 239.4 149.9z"
              fill="#34A853"
            />
            <path
              d="M119.8 322.4c-10.3-30.7-10.3-63.8 0-94.5V158h-87v69.9h-0.1z"
              fill="#FBBC05"
            />
            <path
              d="M272 106.1c39.5 0 75 13.6 103 40.2l77-77C405 24.3 345 0 272 0 167.3 0 76.7 62.7 32.6 149.9l87 69.9c21.5-63.9 81.5-111.6 152.4-111.6z"
              fill="#EA4335"
            />
          </svg>
          Sign up with Google
        </button>

        <div className="text-center text-gray-400 mt-4 text-sm">
          <button onClick={handleLoginClick} className="hover:underline">
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthenticatorSignUp;
