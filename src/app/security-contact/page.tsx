"use client";

import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaMapMarkedAlt,
  FaPhoneAlt,
  FaArrowRight,
  FaExclamationCircle,
} from "react-icons/fa";
import { MdEmergency } from "react-icons/md";
import Link from "next/link";
import { useState } from "react";

export default function SecurityContactPage() {
  const [userLocation] = useState("ADM Building, Level 2");
  const [nearestExit] = useState("Main Entrance - ADM Building");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-28">
      {/* 🔴 Top Emergency Bar — same height as EmergencyPage */}
      {/* 🔴 Top Bar (not sticky, same height as Emergency) */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-3 flex gap-3">
            <a
              href="tel:999"
              className="flex-1 inline-flex items-center justify-center rounded-xl px-4 py-3 bg-[#EF4444] text-white font-semibold shadow-sm hover:bg-red-600"
            >
              <FaPhoneAlt className="mr-2" /> Emergency 999
            </a>
            <Link
              href="/exit-navigation"
              className="flex-1 inline-flex items-center justify-center rounded-xl px-4 py-3 bg-gray-900 text-white font-semibold shadow-sm hover:bg-black"
            >
              Go to Exit Navigation
            </Link>
          </div>
        </div>


      {/* 🧭 Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-6 py-8"
      >
        <h1 className="text-2xl font-semibold text-gray-900">Security & Emergency</h1>
        <p className="text-gray-600 text-sm mt-1.5">
          Campus emergency resources, safety hotlines, and quick response contacts.
        </p>

        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-red-700 text-sm flex items-start">
          <FaExclamationCircle className="mr-2 mt-0.5" />
          <p>
            <strong>Reminder:</strong> Stay calm during emergencies and follow the nearest illuminated exit signs.
          </p>
        </div>
      </motion.div>

      {/* 📍 Location & Exit Info */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="max-w-6xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Emergency Exit Guide</h2>
        <p className="text-sm text-gray-600">
          Your location: <span className="font-medium">{userLocation}</span>
        </p>
        <p className="text-sm text-gray-600">
          Nearest exit: <span className="font-medium">{nearestExit}</span>
        </p>
        <Link
          href="/exit-navigation"
          className="inline-block mt-3 text-[#EF4444] text-sm font-semibold hover:underline"
        >
          Open Exit Navigation →
        </Link>
      </motion.div>

      {/* ☎️ Emergency Contacts */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="max-w-6xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-2">
          <MdEmergency className="text-[#EF4444] w-5 h-5 mr-2" />
          Emergency Contacts
        </h2>
        <p className="text-sm text-gray-600 mb-4">Available 24/7 on campus.</p>

        {[
          { name: "Campus Security", phone: "082-260-607" },
          { name: "Emergency Services", phone: "999" },
          { name: "Health Clinic", phone: "082-260-610" },
        ].map((contact, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 mb-3 border border-gray-100 hover:border-[#EF4444] transition"
          >
            <div>
              <h3 className="font-medium text-gray-800">{contact.name}</h3>
              <p className="text-gray-500 text-sm">{contact.phone}</p>
            </div>
            <a
              href={`tel:${contact.phone.replace(/-/g, "")}`}
              className="text-[#EF4444] hover:text-red-600 text-lg"
              aria-label={`Call ${contact.name}`}
            >
              📞
            </a>
          </div>
        ))}
      </motion.div>

      {/* ⚙️ Quick Action Shortcuts */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 gap-5 mb-20">
        <QuickActionCard
          href="/safety"
          icon={<FaShieldAlt className="w-5 h-5 text-[#EF4444]" />}
          title="Safety Protocols"
          desc="Fire safety, personal safety, and health support."
        />
        <QuickActionCard
          href="/exit-navigation"
          icon={<FaMapMarkedAlt className="w-5 h-5 text-[#EF4444]" />}
          title="Exit Navigation"
          desc="Find the nearest exit and follow guidance."
        />
      </div>
    </div>
  );
}

/* 🔗 Reusable Quick Action Card */
function QuickActionCard({
  href,
  icon,
  title,
  desc,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
      <Link
        href={href}
        className="flex items-center justify-between bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100 hover:border-[#EF4444] hover:shadow-md transition"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white rounded-lg border border-gray-200">{icon}</div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
            <p className="text-xs text-gray-500">{desc}</p>
          </div>
        </div>
        <FaArrowRight className="text-gray-400 w-4 h-4" />
      </Link>
    </motion.div>
  );
}
