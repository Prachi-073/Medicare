import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import HospitalExplorer from "./pages/Explore_now";
import Login from "./pages/login";
import RegisterPatient from "./pages/register/register_patient";
import RegisterDoctor from "./pages/register/register_doctor";
import PatientDashboard from "./pages/dashboard/patient_dashboard";
import DoctorDashboard from "./pages/dashboard/doctor_dashboard";
import EditProfile from "./pages/dashboard/edit_profile";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/explore" element={<HospitalExplorer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/register_patient" element={<RegisterPatient />} />
        <Route path="/register/register_doctor" element={<RegisterDoctor />} />
        <Route path="/dashboard/patient" element={<PatientDashboard />} />
        <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
        <Route path="/edit_profile" element={<EditProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
