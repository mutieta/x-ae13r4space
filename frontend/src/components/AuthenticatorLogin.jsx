import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google"; // useGoogleLogin hook

const API_BASE_URL = "http://admin.xa13r4space.me/api"; // Adjust if necessary

const AuthenticatorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
        remember: rememberMe, // Optional: send remember flag if your backend supports it
      });

      console.log("Login successful:", response.data);

      // Store token in localStorage (or cookies if needed)
      localStorage.setItem("token", response.data.token);

      // Redirect user to the landing page
      navigate("/");
    } catch (err) {
      const errors = err.response?.data?.errors;
      const errorMsg = errors
        ? Object.values(errors).flat().join(" ")
        : err.response?.data?.message || "Login failed. Please try again.";
      console.error("Login error:", err.response?.data || err.message);
      setError(errorMsg);
    }
  };

  const handleForgotPasswordClick = () => {
    navigate("/forgot-password");
  };

  // Google login hook
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
        {/* NASA Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg"
            alt="NASA Logo"
            className="w-24"
          />
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Field */}
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

          {/* Password Field */}
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

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center text-gray-400 text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember Me
            </label>
            <button
              type="button"
              onClick={handleForgotPasswordClick}
              className="hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-lg font-semibold transition"
          >
            Login
          </button>

          {/* Custom Google Login Button */}
          <button
            type="button"
            onClick={() => googleLogin()}
            className="mt-6 w-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-black py-2 rounded-lg text-lg font-semibold transition"
          >
            {/* Google SVG Icon */}
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
            Login with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthenticatorLogin;
