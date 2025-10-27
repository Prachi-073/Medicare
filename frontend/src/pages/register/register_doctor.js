import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  UserCircle,
  Stethoscope,
  Award,
  Calendar,
  ArrowLeft,
  Phone,
} from "lucide-react";
import { apiService } from "../../services/api";

const RegisterDoctor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userType, setUserType] = useState("doctor");

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    phoneNo: "",
    registrationNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (formData.phoneNo.length !== 10) {
      setError("Phone number must be 10 digits!");
      return;
    }

    if (!formData.registrationNumber) {
      setError("Registration number is required!");
      return;
    }

    setLoading(true);

    try {
      const response = await apiService.registerDoctor({
        username: formData.username,
        name: formData.name,
        email: formData.email,
        phoneNo: formData.phoneNo,
        registrationNumber: formData.registrationNumber,
        password: formData.password,
      });

      if (response.success) {
        if (response.data.token) {
          localStorage.setItem("authToken", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        alert(response.data.message || "Doctor registration successful!");
        navigate("/login");
      } else {
        setError(response.data.message || "Registration failed!");
      }
    } catch (err) {
      setError("Unexpected error. Please try again.");
      console.error("Doctor registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FCFCF9] px-4 py-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-xl p-5 relative">
        {/* Back Button */}
        <Link
          to="/explore"
          className="flex items-center text-[#21748C] hover:text-[#1D6278] transition-colors mb-4"
        >
          <ArrowLeft size={20} className="mr-1" />
          <span className="text-sm font-medium">Back</span>
        </Link>

        {/* Header */}
        <h1 className="text-2xl font-bold text-[#21748C] text-center mb-1">
          Medicare
        </h1>
        <p className="text-center text-[#626C71] text-sm mb-6">
          Your healthcare journey starts here
        </p>

        {/* Tabs */}
        <div className="flex mb-6">
          <Link to="/login" className="w-1/2">
            <button className="w-full py-2.5 text-sm bg-[#D4E6DC] text-[#21748C] font-semibold rounded-l-lg border border-[#BED5C9] hover:bg-[#C5DDD0] transition-all duration-300">
              Login
            </button>
          </Link>
          <button className="w-1/2 py-2.5 text-sm bg-[#21748C] text-white font-semibold rounded-r-lg border border-[#21748C] transition-all duration-300">
            Register
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#134252] font-medium mb-1.5 text-sm">
              Username *
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
              className="w-full border border-[#BED5C9] rounded-lg px-3 py-2.5 outline-none focus:border-[#21748C]"
            />
          </div>

          <div>
            <label className="block text-[#134252] font-medium mb-1.5 text-sm">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
              className="w-full border border-[#BED5C9] rounded-lg px-3 py-2.5 outline-none focus:border-[#21748C]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[#134252] font-medium mb-1.5 text-sm">
              Email *
            </label>
            <div className="flex items-center border border-[#BED5C9] rounded-lg px-3 py-2.5">
              <Mail className="text-[#626C71] mr-2" size={18} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#134252] font-medium mb-1.5 text-sm">
              Phone Number *
            </label>
            <div className="flex items-center border border-[#BED5C9] rounded-lg px-3 py-2.5">
              <Phone className="text-[#626C71] mr-2" size={18} />
              <input
                type="tel"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                placeholder="10-digit number"
                required
                maxLength="10"
                pattern="[0-9]{10}"
                className="w-full outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#134252] font-medium mb-1.5 text-sm">
              Registration Number *
            </label>
            <div className="flex items-center border border-[#BED5C9] rounded-lg px-3 py-2.5">
              <Award className="text-[#626C71] mr-2" size={18} />
              <input
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                placeholder="e.g., MCI123456"
                required
                className="w-full outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#134252] font-medium mb-1.5 text-sm">
              Password *
            </label>
            <div className="flex items-center border border-[#BED5C9] rounded-lg px-3 py-2.5">
              <Lock className="text-[#626C71] mr-2" size={18} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                className="w-full outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#134252] font-medium mb-1.5 text-sm">
              Confirm Password *
            </label>
            <div className="flex items-center border border-[#BED5C9] rounded-lg px-3 py-2.5">
              <Lock className="text-[#626C71] mr-2" size={18} />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                required
                className="w-full outline-none text-sm"
              />
            </div>
          </div>

          <div className="md:col-span-2 mt-1">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#21748C] text-white rounded-lg font-semibold hover:bg-[#1D6278] transition-colors text-sm disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        <p className="text-xs text-center mt-4 text-[#626C71]">
          Already have an account?{" "}
          <Link to="/login" className="text-[#21748C] font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterDoctor;
