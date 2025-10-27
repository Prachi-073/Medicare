import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit2, ArrowLeft, LogOut } from "lucide-react";

const TABS = [
  "Overview",
  "Medical History",
  "Appointments",
  "Prescriptions",
  "Lab Results"
];

export default function PatientDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    navigate("/explore");
    window.location.reload();
  };

  if (!user)
    return (
      <div className="flex items-center justify-center h-screen bg-[#FCFCF9] text-[#21748C] text-lg">
        Loading your profile...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F6FAF8]">
      {/* Top navBar */}
      <nav className="w-full bg-[#0E5F73] flex items-center px-6 py-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-white text-sm font-medium mr-3"
        >
          <ArrowLeft size={20} className="mr-1" />
          Back
        </button>
        <span className="flex items-center text-[#FDFDFB] text-2xl font-semibold ml-2">
          <span className="inline-flex justify-center items-center rounded-full bg-[#83C6B6] w-7 h-7 mr-2">
            <svg viewBox="0 0 20 20" fill="#FCFCF9" className="w-5 h-5">
              <path d="M10 18s-7.094-5.507-8.708-8.07A5.25 5.25 0 019.98 3.49h.04a5.25 5.25 0 018.687 6.439C17.094 12.493 10 18 10 18z"></path>
            </svg>
          </span>
          My Profile
        </span>
        <div className="flex-1" />
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-[#ECF2F9] hover:bg-[#E4ECF7] shadow px-4 py-2.5 rounded-lg text-[#21748C] font-semibold text-base ml-16"
        >
          <LogOut size={19} /> Logout
        </button>
      </nav>

      {/* Profile Card */}
      <div
        className="bg-white shadow rounded-xl mt-8 mx-auto flex items-center justify-between"
        style={{ maxWidth: 1600, padding: "32px 40px" }}
      >
        <div className="flex items-center">
          <div className="w-22 h-22 min-w-[88px] min-h-[88px] rounded-full bg-gradient-to-tr from-[#21748C] to-[#A7C7B7] flex items-center justify-center text-white text-4xl font-bold mr-8">
            {user.name ? user.name[0] : "U"}
          </div>
          <div className="flex flex-col">
            <span className="text-[#165273] text-3xl font-bold">{user.name}</span>
            <span className="text-[#206B84] mt-1 text-base">{user.email}</span>
            {!!user.bloodType && !!user.gender && (
              <div className="flex gap-2 mt-2">
                {user.bloodType && (
                  <span className="bg-[#DBF3E6] text-[#4ABDA7] font-medium px-3 py-1 rounded-full text-sm">
                    Blood Type: {user.bloodType}
                  </span>
                )}
                {user.gender && (
                  <span className="bg-[#D2EAF6] text-[#379CB8] font-medium px-3 py-1 rounded-full text-sm">
                    {user.gender}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => navigate("/edit_profile")}
          className="flex items-center gap-2 bg-gradient-to-r from-[#2BA2A5] to-[#44BAA0] shadow px-6 py-2.5 rounded-lg text-white font-semibold text-base hover:from-[#219494] hover:to-[#379874] transition"
        >
          <Edit2 size={19} /> Edit Profile
        </button>
      </div>

      {/* Dynamic Tabs Section */}
      <div className="pt-6 px-12" style={{ maxWidth: 1600, margin: "0 auto" }}>
        <div className="flex items-center gap-0 bg-[#EEF4F0] rounded-xl p-1">
          {TABS.map((tab, idx) => (
            <button
              key={tab}
              onClick={() => setActiveTab(idx)}
              className={`flex-1 transition text-base font-semibold py-2
                ${activeTab === idx
                  ? "bg-white shadow rounded-lg text-[#18788E]"
                  : "text-[#21748C]"
                }`}
              style={{
                margin: "0 3px",
                minWidth: "200px",
                fontWeight: activeTab === idx ? "600" : "500"
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-8 px-12" style={{ maxWidth: 1600, margin: "0 auto" }}>
        {activeTab === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl p-8 shadow flex flex-col min-h-[290px]">
              <h2 className="text-2xl font-semibold text-[#16697A] flex items-center gap-3">
                <span>
                  <svg className="inline-block" width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM6 22V20c0-2.21 3.58-4 8-4s8 1.79 8 4v2" stroke="#16697A" strokeWidth="2"/></svg>
                </span>
                Personal Information
              </h2>
              <ul className="mt-4 space-y-3 text-[#16697A] text-lg">
                <li className="flex items-center gap-2">
                  <svg width="22" height="22" fill="none" stroke="#16697A" strokeWidth="2" className="inline-block" viewBox="0 0 24 24"><path d="M4 4h16v16H4z" /><path d="M22 6l-10 7L2 6" /></svg>
                  {user.email || ""}
                </li>
                <li className="flex items-center gap-2">
                  <svg width="22" height="22" fill="none" stroke="#16697A" strokeWidth="2" className="inline-block" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M15 11l-3 3-1-1" /></svg>
                  {user.phoneNo || ""}
                </li>
                <li className="flex items-center gap-2">
                  <svg width="22" height="22" fill="none" stroke="#16697A" strokeWidth="2" className="inline-block" viewBox="0 0 24 24"><path d="M8 7V3a1 1 0 012 0v4"></path><rect width="16" height="12" x="2" y="7" rx="2"></rect></svg>
                  DOB: {user.dateOfBirth || ""}
                </li>
                <li className="flex items-center gap-2">
                  <svg width="20" height="20" fill="none" stroke="#16697A" strokeWidth="2" className="inline-block" viewBox="0 0 24 24"><path d="M5.121 18.364A9 9 0 0020.485 7.95" /></svg>
                  {user.address || ""}
                </li>
              </ul>
            </div>
            {/* Health Statistics */}
            <div className="bg-white rounded-xl p-8 shadow flex flex-col min-h-[290px]">
              <h2 className="text-2xl font-semibold text-[#16697A] flex items-center gap-3">
                <span>
                  <svg width="28" height="28" className="inline-block" fill="none" stroke="#16697A" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 17V7a2 2 0 012-2h12a2 2 0 012 2v10" /><path d="M16 10v6" /><path d="M8 14v2" /><path d="M12 4v6" /></svg>
                </span>
                Health Statistics
              </h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-0 mt-4 text-[#16697A] text-lg">
                <div>
                  <div className="font-medium">Height</div>
                  <div className="font-bold text-2xl mt-1">{user.height || ""} cm</div>
                </div>
                <div>
                  <div className="font-medium">Weight</div>
                  <div className="font-bold text-2xl mt-1">{user.weight || ""} kg</div>
                </div>
                <div>
                  <div className="font-medium">Blood Type</div>
                  <div className="font-bold text-2xl mt-1">{user.bloodGroup || ""}</div>
                </div>
                <div>
                  <div className="font-medium">Gender</div>
                  <div className="font-bold text-2xl mt-1">{user.gender || ""}</div>
                </div>
              </div>
            </div>
            {/* Emergency Contact */}
            <div className="bg-white rounded-xl p-8 shadow flex flex-col min-h-[290px]">
              <h2 className="text-2xl font-semibold text-[#16697A] flex items-center gap-3">
                <span className="text-red-500">
                  <svg width="22" height="22" className="inline-block" fill="none" stroke="red" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" /></svg>
                </span>
                Emergency Contact
              </h2>
              <div className="mt-4 text-[#16697A] text-lg">
                <div className="mb-1"><span className="font-semibold">Name</span><br />{user.emergencyContact?.name || ""}</div>
                <div className="mb-1"><span className="font-semibold">Relationship</span><br />{user.emergencyContact?.relationship || ""}</div>
                <div className="mb-1"><span className="font-semibold">Phone</span><br />{user.emergencyContact?.phoneNo || ""}</div>
              </div>
            </div>
            {/* Latest Vital Signs */}
            <div className="bg-white rounded-xl p-8 shadow flex flex-col min-h-[290px]">
              <h2 className="text-2xl font-semibold text-[#16697A] flex items-center gap-3">
                <span>
                  <svg width="28" height="28" className="inline-block" fill="none" stroke="#16697A" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21C6.477 21 2 16.523 2 11V6.303A1 1 0 013.658 5.05l1.394.696a7 7 0 005.482 0l1.394-.696A1 1 0 0112 6.303V11c0 5.523 4.477 10 10 10h0a1 1 0 001-1v-1c0-.47-.33-.87-.797-.982A10.943 10.943 0 0112 21z" /></svg>
                </span>
                Latest Vital Signs
              </h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-0 mt-4 text-[#16697A] text-lg">
                <div>
                  <div className="font-medium">Blood Pressure</div>
                  <div className="font-bold text-2xl mt-1">{user.latestVitals?.bloodPressure || ""}</div>
                </div>
                <div>
                  <div className="font-medium">Heart Rate</div>
                  <div className="font-bold text-2xl mt-1">{user.latestVitals?.heartRate || ""} bpm</div>
                </div>
                <div>
                  <div className="font-medium">Temperature</div>
                  <div className="font-bold text-2xl mt-1">{user.latestVitals?.temperature || ""} °F</div>
                </div>
                <div>
                  <div className="font-medium">Weight</div>
                  <div className="font-bold text-2xl mt-1">{user.latestVitals?.weight || ""} kg</div>
                </div>
              </div>
              <div className="text-sm mt-4 text-[#8AA0A6]">
                Last updated: {user.latestVitals?.date || ""}
              </div>
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <div>
            <h2 className="text-lg font-semibold text-[#21748C] mb-6">Medical History</h2>
            <p>Your medical history content here...</p>
          </div>
        )}
        {activeTab === 2 && (
          <div>
            <h2 className="text-lg font-semibold text-[#21748C] mb-6">Appointments</h2>
            <p>Your appointments content here...</p>
          </div>
        )}
        {activeTab === 3 && (
          <div>
            <h2 className="text-lg font-semibold text-[#21748C] mb-6">Prescriptions</h2>
            <p>Your prescriptions content here...</p>
          </div>
        )}
        {activeTab === 4 && (
          <div>
            <h2 className="text-lg font-semibold text-[#21748C] mb-6">Lab Results</h2>
            <p>Your lab results content here...</p>
          </div>
        )}
      </div>
    </div>
  );
}
