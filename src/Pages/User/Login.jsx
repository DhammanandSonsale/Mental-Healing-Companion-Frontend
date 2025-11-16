import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = "http://localhost:8080/api/auth";

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" }); // clear that field’s error
  };

  // Switch between login/signup tabs
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setFormErrors({});
  };

  // Decode JWT Token to extract user info
  const decodeToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.user;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  // ✅ Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormErrors({});

    try {
      const res = await axios.post(`${API_URL}/login`, {
        email: formData.email,
        password: formData.password,
      });

      const token = res.data.token;
      const decodedUser = decodeToken(token);

      if (!decodedUser) {
        setFormErrors({ general: "Login failed — could not decode user info." });
        setLoading(false);
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ _id: decodedUser.id }));

      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.msg?.toLowerCase() || "";

      if (msg.includes("email")) {
        setFormErrors({ email: "Invalid or unregistered email." });
      } else if (msg.includes("password")) {
        setFormErrors({ password: "Incorrect password." });
      } else {
        setFormErrors({ general: "Login failed. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormErrors({});

    if (formData.password !== formData.confirmPassword) {
      setFormErrors({
        confirmPassword: "Passwords do not match.",
      });
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${API_URL}/signup`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // After signup, switch to login
      setActiveTab("login");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      const msg = err.response?.data?.msg?.toLowerCase() || "";

      if (msg.includes("email")) {
        setFormErrors({ email: "Email already registered." });
      } else if (msg.includes("password")) {
        setFormErrors({ password: "Password is too weak." });
      } else {
        setFormErrors({ general: "Signup failed. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 text-gray-800 p-6 py-20 relative overflow-hidden">
      {/* Main Card */}
      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-6xl min-h-[600px] border border-gray-200">
        {/* Left Image Section */}
        <div
          className="relative hidden md:flex w-1/2 bg-cover bg-center"
          style={{
            backgroundImage: `url('/assets/images/loginimg.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/70 via-indigo-800/50 to-transparent" />
          <div className="relative z-10 flex flex-col justify-between p-10 text-white">
            <div className="text-right">
              <button
                onClick={() => navigate("/")}
                className="text-sm bg-white/20 hover:bg-white/30 px-4 py-1.5 rounded-full transition"
              >
                ← Back to Website
              </button>
            </div>
            <div className="mt-20">
              <h2 className="text-xl font-light mb-2">Welcome to</h2>
              <h1 className="text-4xl font-bold mb-3 text-indigo-100 drop-shadow-lg">
                Mental Healing Companion
              </h1>
              <p className="text-indigo-100/90 max-w-sm leading-relaxed text-sm">
                Empowering your wellness journey with mindfulness, positivity,
                and support.
              </p>
            </div>
            <div className="text-xs text-indigo-200 mt-6">
              © {new Date().getFullYear()} Mental Healing Companion
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-gradient-to-b from-white to-indigo-50">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-indigo-700">
              {activeTab === "login" ? "Welcome Back" : "Create an Account"}
            </h2>
            <button
              onClick={() =>
                setActiveTab(activeTab === "login" ? "signup" : "login")
              }
              className="text-sm text-indigo-500 hover:text-indigo-600 transition"
            >
              {activeTab === "login"
                ? "New here? Sign Up"
                : "Already have an account? Log In"}
            </button>
          </div>

          {/* LOGIN FORM */}
          {activeTab === "login" && (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="text-gray-700 text-sm">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 transition ${
                    formErrors.email
                      ? "border-red-500 focus:ring-red-300"
                      : "border-gray-300 focus:ring-indigo-400"
                  }`}
                  placeholder="Enter your email"
                  required
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="text-gray-700 text-sm">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 transition ${
                    formErrors.password
                      ? "border-red-500 focus:ring-red-300"
                      : "border-gray-300 focus:ring-indigo-400"
                  }`}
                  placeholder="Enter your password"
                  required
                />
                {formErrors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.password}
                  </p>
                )}
              </div>

              {formErrors.general && (
                <p className="text-red-500 text-sm text-center">
                  {formErrors.general}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition font-medium shadow-md"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          )}

          {/* SIGNUP FORM */}
          {activeTab === "signup" && (
            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <label className="text-gray-700 text-sm">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="text-gray-700 text-sm">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 transition ${
                    formErrors.email
                      ? "border-red-500 focus:ring-red-300"
                      : "border-gray-300 focus:ring-indigo-400"
                  }`}
                  placeholder="Enter your email"
                  required
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="text-gray-700 text-sm">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 transition ${
                    formErrors.password
                      ? "border-red-500 focus:ring-red-300"
                      : "border-gray-300 focus:ring-indigo-400"
                  }`}
                  placeholder="Enter your password"
                  required
                />
                {formErrors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.password}
                  </p>
                )}
              </div>

              <div>
                <label className="text-gray-700 text-sm">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 transition ${
                    formErrors.confirmPassword
                      ? "border-red-500 focus:ring-red-300"
                      : "border-gray-300 focus:ring-indigo-400"
                  }`}
                  placeholder="Re-enter your password"
                  required
                />
                {formErrors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.confirmPassword}
                  </p>
                )}
              </div>

              {formErrors.general && (
                <p className="text-red-500 text-sm text-center">
                  {formErrors.general}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition font-medium shadow-md"
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
