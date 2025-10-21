"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  FaDoorOpen,
  FaPhoneAlt,
  FaMapMarkedAlt,
  FaWalking,
  FaDirections,
  FaMapPin,
  FaExclamationCircle,
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaTools,
} from "react-icons/fa";
import Link from "next/link";

type ExitInfo = {
  location: string;
  name: string;
  distance: string;
  direction: string;
  estimatedTime: string;
  status: "Open" | "Closed" | "Under Maintenance";
};

export default function ExitNavigationPage() {
  const [userLocation, setUserLocation] = useState("ADM Building, Level 2");
  const [search, setSearch] = useState("");

  const exits: ExitInfo[] = [
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

  const nearestExit = exits.find((e) => e.status === "Open") ?? exits[0];

  const filteredExits = useMemo(
    () =>
      exits.filter(
        (e) =>
          e.name.toLowerCase().includes(search.toLowerCase()) ||
          e.location.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const handleLocateMe = () => {
    toast.loading("Updating your location…");
    setTimeout(() => {
      toast.dismiss();
      setUserLocation("Library, Ground Floor");
      toast.success("Location updated");
    }, 900);
  };

  const openNavigation = () => {
    window.open("https://maps.google.com/?q=emergency+exit+near+me", "_blank");
  };

  const copyDirections = () => {
    navigator.clipboard.writeText(
      `From ${userLocation}, go to ${nearestExit.name}. Direction: ${nearestExit.direction}.`
    );
    toast.success("Directions copied");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-32">
      <Toaster position="top-center" />

      {/* 🔴 Top Bar (same height and visual as Emergency Page, NOT sticky) */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3 flex gap-3">
          <a
            href="tel:999"
            className="flex-1 inline-flex items-center justify-center rounded-xl px-4 py-3 bg-[#EF4444] text-white font-semibold shadow-sm hover:bg-red-600 transition"
          >
            <FaPhoneAlt className="mr-2" /> Emergency 999
          </a>
          <Link
            href="/exit-navigation"
            className="flex-1 inline-flex items-center justify-center rounded-xl px-4 py-3 bg-gray-900 text-white font-semibold shadow-sm hover:bg-black transition"
          >
            Go to Exit Navigation
          </Link>
        </div>
      </div>

      {/* Header */}
      <header className="max-w-6xl mx-auto px-6 py-6">
        <motion.h1
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-900"
        >
          Exit Navigation
        </motion.h1>
        <p className="text-gray-600">
          Find the nearest safe exit and view real-time status.
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6 space-y-6">
        {/* Current Location */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold text-gray-900 text-lg flex items-center">
                <FaMapPin className="text-gray-500 mr-2" /> Your Current Location
              </h2>
              <p className="text-gray-700">{userLocation}</p>
            </div>
            <button
              onClick={handleLocateMe}
              className="text-sm bg-[#EF4444] text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Update Location
            </button>
          </div>
        </motion.div>

        {/* Nearest Exit */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
        >
          <div className="flex items-center gap-2 mb-2">
            <FaDoorOpen className="text-[#EF4444]" />
            <h2 className="font-semibold text-gray-900 text-lg">Nearest Exit</h2>
          </div>
          <p className="text-gray-800 font-medium">{nearestExit.name}</p>
          <p className="text-gray-500 text-sm">
            Distance: {nearestExit.distance} • Est. Time:{" "}
            {nearestExit.estimatedTime}
          </p>
          <p className="text-gray-600 text-sm">Direction: {nearestExit.direction}</p>
          <StatusBadge status={nearestExit.status} />

          {/* Mini Map Placeholder */}
          <div className="mt-4 rounded-xl overflow-hidden border border-gray-100">
            <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
              Map preview (add Google Static Maps key to show real map)
            </div>
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center"
        >
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-center gap-2">
            <FaMapMarkedAlt /> Navigation Options
          </h3>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={openNavigation}
              className="flex items-center justify-center bg-[#EF4444] text-white px-5 py-3 rounded-lg hover:bg-red-600 w-full sm:w-auto font-semibold transition"
            >
              <FaDirections className="mr-2" />
              Open in Maps
            </button>
            <button
              onClick={copyDirections}
              className="flex items-center justify-center border border-gray-300 text-gray-800 px-5 py-3 rounded-lg hover:bg-gray-50 w-full sm:w-auto font-semibold transition"
            >
              <FaWalking className="mr-2" />
              Copy Directions
            </button>
          </div>
        </motion.div>

        {/* All Exits */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mt-6 mb-4"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-900 text-lg flex items-center">
              <FaDoorOpen className="text-[#EF4444] mr-2" /> All Campus Exits
            </h2>
            <label className="flex items-center border border-gray-300 rounded-lg px-3 py-2 shadow-sm bg-gray-50">
              <FaSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search exits…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-sm focus:outline-none bg-transparent w-28"
                aria-label="Search exits"
              />
            </label>
          </div>

          <div className="space-y-3">
            {filteredExits.map((e, i) => (
              <div
                key={i}
                className="flex justify-between items-center border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition"
              >
                <div>
                  <p className="font-medium text-gray-900">{e.name}</p>
                  <p className="text-gray-500 text-sm">
                    {e.location} • {e.distance}
                  </p>
                </div>
                <StatusBadge status={e.status} />
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

function StatusBadge({ status }: { status: ExitInfo["status"] }) {
  let styles =
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border";
  let icon: JSX.Element = <FaExclamationCircle className="mr-1" />;

  if (status === "Open") {
    styles += " bg-green-50 text-green-700 border-green-200";
    icon = <FaCheckCircle className="mr-1" />;
  } else if (status === "Closed") {
    styles += " bg-red-50 text-[#EF4444] border-red-200";
    icon = <FaTimesCircle className="mr-1" />;
  } else {
    styles += " bg-yellow-50 text-yellow-700 border-yellow-200";
    icon = <FaTools className="mr-1" />;
  }

  return (
    <span className={styles} aria-live="polite">
      {icon}
      {status}
    </span>
  );
}
