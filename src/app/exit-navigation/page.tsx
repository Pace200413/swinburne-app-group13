"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  FaDoorOpen,
  FaMapMarkedAlt,
  FaWalking,
  FaDirections,
  FaMapPin,
  FaExclamationCircle,
  FaSearch,
} from "react-icons/fa";

export default function ExitNavigationPage() {
  const [userLocation, setUserLocation] = useState("ADM Building, Level 2");
  const [search, setSearch] = useState("");

  const exits = [
    {
      location: "ADM Building, Level 2",
      name: "Main Entrance - ADM Building",
      distance: "45m",
      direction: "Head straight, then turn left near the stairwell",
      estimatedTime: "1 minute",
      status: "Open",
    },
    {
      location: "Library, Ground Floor",
      name: "East Exit - Library",
      distance: "25m",
      direction: "Walk straight to the corridor, turn right at the corner",
      estimatedTime: "1 minute",
      status: "Open",
    },
    {
      location: "Student Centre, Level 3",
      name: "Stairwell B - Emergency Exit",
      distance: "30m",
      direction: "Take the stairs down, exit through the red door",
      estimatedTime: "2 minutes",
      status: "Under Maintenance",
    },
    {
      location: "Engineering Block, Level 1",
      name: "West Exit - Engineering",
      distance: "40m",
      direction: "Follow the hallway past the lab, exit through the steel door",
      estimatedTime: "2 minutes",
      status: "Closed",
    },
  ];

  const nearestExit = exits[1];

  const filteredExits = useMemo(
    () =>
      exits.filter(
        (exit) =>
          exit.name.toLowerCase().includes(search.toLowerCase()) ||
          exit.location.toLowerCase().includes(search.toLowerCase())
      ),
    [search, exits]
  );

  const handleLocateMe = () => {
    toast.loading("Updating your location...");
    setTimeout(() => {
      toast.dismiss();
      setUserLocation("Library, Ground Floor");
      toast.success("Location updated successfully!");
    }, 1000);
  };

  const openNavigation = () => {
    window.open("https://maps.google.com/?q=emergency+exit+near+me", "_blank");
  };

  const copyDirections = () => {
    navigator.clipboard.writeText(
      `From ${userLocation}, go to ${nearestExit.name}. Direction: ${nearestExit.direction}.`
    );
    toast.success("Directions copied!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16">
      <Toaster position="top-center" />

      {/* Page Header */}
      <header className="max-w-5xl mx-auto px-6 py-8">
        <motion.h1
          className="text-3xl font-bold text-gray-900"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Exit Navigation
        </motion.h1>
        <p className="text-gray-500 text-sm">
          Find the nearest safe exit and view all available emergency exits around campus.
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 space-y-6">
        {/* Current Location */}
        <motion.div
          className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 hover:shadow-lg transition"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-800 text-lg mb-1 flex items-center">
                <FaMapPin className="text-gray-500 mr-2" />
                Your Current Location
              </h2>
              <p className="text-gray-600">{userLocation}</p>
            </div>
            <button
              onClick={handleLocateMe}
              className="text-sm bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Update Location
            </button>
          </div>
        </motion.div>

        {/* Nearest Exit */}
        <motion.div
          className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 space-y-3 hover:shadow-lg transition"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-3 mb-1">
            <FaDoorOpen className="text-[#EF4444] w-5 h-5" />
            <h2 className="font-semibold text-gray-900 text-lg">Nearest Exit</h2>
          </div>
          <p className="text-gray-800 font-medium">{nearestExit.name}</p>
          <p className="text-gray-500 text-sm">
            Distance: {nearestExit.distance} | Est. Time: {nearestExit.estimatedTime}
          </p>
          <p className="text-gray-600 text-sm">Direction: {nearestExit.direction}</p>
          <StatusBadge status={nearestExit.status} />

          {/* Map placeholder (no API key needed) */}
          <div className="mt-4 rounded-xl overflow-hidden border border-gray-100">
            <div className="w-full h-[160px] bg-[linear-gradient(135deg,#f5f7fa,#e4e7eb)] grid place-items-center">
              <span className="text-xs text-gray-500">Map preview</span>
            </div>
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 text-center hover:shadow-lg transition"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="font-semibold text-gray-900 flex items-center justify-center space-x-2 mb-4">
            <FaMapMarkedAlt className="text-[#EF4444]" />
            <span>Navigation Options</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={openNavigation}
              className="flex items-center justify-center bg-red-600 text-white px-5 py-3 rounded-lg hover:bg-red-700 transition w-full sm:w-auto"
            >
              <FaDirections className="w-5 h-5 mr-2" />
              Open in Maps
            </button>
            <button
              onClick={copyDirections}
              className="flex items-center justify-center border border-gray-300 text-gray-700 px-5 py-3 rounded-lg hover:bg-gray-50 transition w-full sm:w-auto"
            >
              <FaWalking className="w-5 h-5 mr-2" />
              Copy Directions
            </button>
          </div>
        </motion.div>

        {/* All Exits Section */}
        <motion.div
          className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 hover:shadow-lg transition"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-900 text-lg flex items-center">
              <FaDoorOpen className="text-[#EF4444] mr-2" /> All Campus Exits
            </h2>
            <div className="flex items-center border border-gray-200 rounded-lg px-2 py-1">
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search exits..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-sm focus:outline-none bg-transparent"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredExits.map((exit, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.01 }}
                className="flex justify-between items-center border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition"
              >
                <div>
                  <p className="font-medium text-gray-900">{exit.name}</p>
                  <p className="text-gray-500 text-sm">
                    {exit.location} • {exit.distance}
                  </p>
                </div>
                <StatusBadge status={exit.status} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Safety Tip */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-sm text-gray-700 flex items-center mt-6">
          <FaExclamationCircle className="text-red-500 mr-2" />
          <p>
            <strong>Emergency Hotline:</strong> 082-260-607 · Always follow illuminated exit signs during evacuation.
          </p>
        </div>
      </main>
    </div>
  );
}

/* --- Status Badge Component --- */
function StatusBadge({ status }: { status: string }) {
  let color = "bg-gray-100 text-gray-700 border border-gray-300";
  let icon = <FaExclamationCircle className="w-4 h-4 mr-1 text-gray-500" />;

  if (status === "Open") {
    color = "bg-green-50 text-green-700 border border-green-200";
    icon = <FaExclamationCircle className="w-4 h-4 mr-1 text-green-500" />;
  } else if (status === "Closed" || status === "Under Maintenance") {
    color = "bg-red-50 text-[#EF4444] border border-red-200";
    icon = <FaExclamationCircle className="w-4 h-4 mr-1 text-[#EF4444]" />;
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${color}`}>
      {icon}
      {status}
    </span>
  );
}
