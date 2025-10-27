import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    navigate("/explore");
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-[#F8FAFB]">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 flex items-center gap-2 bg-[#21748C] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#1D6278] transition"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>

      {/* Dashboard Card */}
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-[#21748C]">
          Welcome, Dr. {user?.name}
        </h1>
        <p className="text-gray-600 mt-3 text-sm">
          You are logged in as a Doctor.
        </p>
      </div>
    </div>
  );
};

export default DoctorDashboard;
