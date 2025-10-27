import React, { useState, useEffect } from "react";
import {
  MapPin,
  Search,
  Star,
  Clock,
  Phone,
  Hospital,
  Stethoscope,
  Users,
  Award,
  Navigation,
  User as UserIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const HospitalExplorer = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [visibleCount, setVisibleCount] = useState(3);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const specialties = [
    "all",
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Gynecology",
    "Oncology",
    "Emergency",
  ];

  const popularHospitals = [
    {
      id: 1,
      name: "City General Hospital",
      location: "Downtown Medical District",
      distance: "2.1 km",
      rating: 4.8,
      reviews: 1247,
      specialties: ["Emergency", "Cardiology", "Neurology"],
      availability: "24/7",
      phone: "+1-555-0101",
      isPopular: true,
      patients: "50K+",
      doctors: 120,
    },
    {
      id: 2,
      name: "Metro Heart Institute",
      location: "Healthcare Plaza",
      distance: "3.5 km",
      rating: 4.9,
      reviews: 892,
      specialties: ["Cardiology", "Cardiac Surgery"],
      availability: "Mon-Sat",
      phone: "+1-555-0102",
      isPopular: true,
      patients: "25K+",
      doctors: 45,
    },
    {
      id: 3,
      name: "Children's Medical Center",
      location: "Family District",
      distance: "4.2 km",
      rating: 4.7,
      reviews: 654,
      specialties: ["Pediatrics", "Neonatal Care"],
      availability: "24/7",
      phone: "+1-555-0103",
      isPopular: false,
      patients: "15K+",
      doctors: 38,
    },
    {
      id: 4,
      name: "Advanced Cancer Center",
      location: "Research District",
      distance: "5.8 km",
      rating: 4.9,
      reviews: 423,
      specialties: ["Oncology", "Radiation Therapy"],
      availability: "Mon-Fri",
      phone: "+1-555-0104",
      isPopular: true,
      patients: "8K+",
      doctors: 25,
    },
    {
      id: 5,
      name: "Women's Health Clinic",
      location: "Central Avenue",
      distance: "1.8 km",
      rating: 4.6,
      reviews: 789,
      specialties: ["Gynecology", "Obstetrics"],
      availability: "Mon-Sat",
      phone: "+1-555-0105",
      isPopular: false,
      patients: "12K+",
      doctors: 22,
    },
    {
      id: 6,
      name: "Emergency Care Plus",
      location: "Highway Medical",
      distance: "6.1 km",
      rating: 4.5,
      reviews: 1156,
      specialties: ["Emergency", "Trauma", "Urgent Care"],
      availability: "24/7",
      phone: "+1-555-0106",
      isPopular: true,
      patients: "75K+",
      doctors: 85,
    },
  ];

  const filteredHospitals = popularHospitals.filter(
    (hospital) =>
      selectedSpecialty === "all" ||
      hospital.specialties.some((spec) =>
        spec.toLowerCase().includes(selectedSpecialty.toLowerCase())
      )
  );

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setSearchLocation("Current Location"),
        () => console.log("Location access denied")
      );
    }
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-[#2C6975] text-white px-8 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Left: Logo + Title */}
          <div className="flex items-center space-x-2">
            <img src="/images/logo.png" alt="Logo" className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Medicare</h1>
          </div>

          {/* Right: Login or User Info */}
          <div className="flex items-center space-x-4">
            <Link to="/">
              <button className="border border-white px-4 py-2 rounded hover:bg-[#CDE0C9] hover:text-[#2C6975]">
                Home
              </button>
            </Link>

            {user ? (
              <div
                className="flex items-center bg-[#1f5460] rounded-full px-3 py-1 space-x-2 cursor-pointer hover:bg-[#17444f] transition"
                onClick={() =>
                  user.userType === "patient"
                    ? navigate("/dashboard/patient")
                    : navigate("/dashboard/doctor")
                }
              >
                <UserIcon className="h-5 w-5 text-yellow-300" />
                <span className="text-sm font-medium">{user.name}</span>
              </div>
            ) : (
              <Link to="/login">
                <button className="border border-white px-4 py-2 rounded hover:bg-[#CDE0C9] hover:text-[#2C6975]">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-[#2C6975] text-white py-6 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">
            Explore Hospitals & Clinics
          </h1>
          <p className="text-yellow-300 text-lg">
            Find the best healthcare providers near you
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Location & Search */}
        <div className="bg-white rounded-xl p-6 shadow mb-8">
          <h2 className="text-xl font-semibold text-[#2C6975] mb-4">
            Your Location
          </h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <input
                placeholder="Enter your city or area"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="pl-10 border rounded px-3 py-2 w-full"
              />
            </div>
            <button
              onClick={requestLocation}
              className="border px-4 py-2 rounded flex items-center gap-2 hover:bg-[#CDE0C9]"
            >
              <Navigation className="h-4 w-4" />
              Use My Location
            </button>
            <button className="bg-[#2C6975] text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-[#1f5460]">
              <Search className="h-4 w-4" />
              Search
            </button>
          </div>
        </div>

        {/* Specialty Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-[#2C6975] mb-4">
            Filter by Specialty
          </h3>
          <div className="flex flex-wrap gap-2">
            {specialties.map((specialty) => (
              <span
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`cursor-pointer px-4 py-2 rounded border ${
                  selectedSpecialty === specialty
                    ? "bg-[#2C6975] text-white"
                    : "hover:bg-[#CDE0C9]"
                }`}
              >
                {specialty === "all" ? "All Specialties" : specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Popular Hospitals Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Award className="h-6 w-6 text-yellow-500" />
            <h2 className="text-2xl font-bold text-[#2C6975]">
              Most Visited Hospitals
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            {filteredHospitals.slice(0, visibleCount).map((hospital) => (
              <div
                key={hospital.id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Hospital className="w-8 h-8 text-[#2C6975]" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-[#2C6975] text-lg">
                          {hospital.name}
                        </h3>
                        {hospital.isPopular && (
                          <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                            Most Visited
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold">{hospital.rating}</span>
                        <span className="text-sm text-gray-500">
                          ({hospital.reviews})
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {hospital.location} • {hospital.distance}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {hospital.specialties.slice(0, 3).map((specialty, index) => (
                        <span
                          key={index}
                          className="text-xs border px-2 py-1 rounded"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-[#2C6975]" />
                          <span>{hospital.availability}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-[#2C6975]" />
                          <span>{hospital.patients}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Stethoscope className="w-4 h-4 text-[#2C6975]" />
                          <span>{hospital.doctors} doctors</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="border px-3 py-1 rounded flex items-center text-sm hover:bg-gray-100">
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </button>
                        <button className="bg-[#2C6975] text-white px-3 py-1 rounded text-sm hover:text-[#CDE0C9]">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {visibleCount < filteredHospitals.length && (
            <div className="flex justify-center mt-6">
              <button
                onClick={loadMore}
                className="bg-[#2C6975] text-white px-6 py-2 rounded hover:bg-[#CDE0C9] hover:text-[#2C6975]"
              >
                View More
              </button>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="bg-[#2C6975] text-white rounded-xl p-8">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-300 mb-1">
                500+
              </div>
              <div>Healthcare Facilities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-300 mb-1">
                10K+
              </div>
              <div>Qualified Doctors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-300 mb-1">
                100K+
              </div>
              <div>Patients Served Monthly</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-300 mb-1">24/7</div>
              <div>Emergency Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalExplorer;
