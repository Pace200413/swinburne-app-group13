"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaPhoneAlt,
  FaShieldAlt,
  FaMapMarkedAlt,
  FaBuilding,
  FaClock,
  FaEnvelope,
  FaMapPin,
  FaExclamationTriangle,
  FaExternalLinkAlt,
} from "react-icons/fa";

export default function SecurityContact() {
  const [userLocation] = useState("ADM Building, Level 2");
  const [nearestExit] = useState("Main Entrance - ADM Building");

  return (
    <div className="min-h-screen bg-[#fafafa] pb-10">
      {/* Global header comes from layout.tsx */}

      {/* Page Header */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold text-gray-900"
        >
          Emergency Services
        </motion.h1>
        <p className="text-gray-500 text-sm">
          Campus safety and emergency resources
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        {/* Campus Security Info */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-3 hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <FaShieldAlt className="text-[#EF4444] w-5 h-5 mr-2" />
            Campus Security
          </h2>
          <p className="text-sm text-gray-500">
            Available 24/7 for safety support, emergencies, and incident
            reporting.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <ContactItem
              icon={<FaPhoneAlt className="text-[#EF4444]" />}
              title="Emergency Hotline"
              detail="082-260-607"
              link="tel:082260607"
            />
            <ContactItem
              icon={<FaEnvelope className="text-[#EF4444]" />}
              title="Email"
              detail="security@swin.edu.my"
              link="mailto:security@swin.edu.my"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <ContactItem
              icon={<FaMapPin className="text-[#EF4444]" />}
              title="Location"
              detail="Security Office, Ground Floor, ADM Building"
            />
            <ContactItem
              icon={<FaClock className="text-[#EF4444]" />}
              title="Operating Hours"
              detail="24 Hours, Monday–Sunday"
            />
          </div>
        </motion.div>

        {/* Emergency Exits */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <FaMapMarkedAlt className="text-[#EF4444] w-5 h-5 mr-2" />
            Nearest Exit Information
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Your location:{" "}
            <span className="font-medium text-gray-800">{userLocation}</span>
          </p>
          <p className="text-sm text-gray-600">
            Nearest exit:{" "}
            <span className="font-medium text-gray-800">{nearestExit}</span>
          </p>

          <Link
            href="/exit-navigation"
            className="inline-block text-[#EF4444] text-sm font-medium mt-3 hover:underline"
          >
            Open Exit Navigation →
          </Link>
        </motion.div>

        {/* Other Important Contacts (Clickable) */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <FaBuilding className="text-[#EF4444] w-5 h-5 mr-2" />
            Other Important Contacts
          </h2>

          <div className="mt-4 space-y-3">
            {[
              {
                name: "Fire & Rescue Department",
                phone: "999",
                link: "tel:999",
              },
              {
                name: "Police Department",
                phone: "999",
                link: "tel:999",
              },
              {
                name: "Ambulance",
                phone: "999",
                link: "tel:999",
              },
            ].map((contact, i) => (
              <a
                key={i}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border border-gray-200 rounded-xl p-4 
                          hover:bg-white hover:border-[#EF4444] hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <FaPhoneAlt className="text-[#EF4444] w-4 h-4" />
                  <div>
                    <h3 className="font-medium text-gray-800 text-sm">
                      {contact.name}
                    </h3>
                    <p className="text-gray-500 text-sm">{contact.phone}</p>
                  </div>
                </div>
                <FaExternalLinkAlt className="text-gray-400 w-3 h-3" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Safety Reminder */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-sm text-gray-700 flex items-center mt-6">
          <FaExclamationTriangle className="text-[#EF4444] mr-2" />
          <p>
            <strong>Reminder:</strong> Always keep your phone accessible in
            case of emergency. Follow security officers’ instructions during
            evacuation.
          </p>
        </div>
      </div>
    </div>
  );
}

/* --- Contact Item Component --- */
function ContactItem({
  icon,
  title,
  detail,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  detail: string;
  link?: string;
}) {
  const Wrapper = link ? "a" : "div";
  return (
    <Wrapper
      {...(link
        ? { href: link, target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className="flex items-center space-x-3 border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition"
    >
      <div className="p-2 bg-white rounded-lg border border-gray-200">{icon}</div>
      <div>
        <h3 className="font-medium text-gray-800 text-sm">{title}</h3>
        {link ? (
          <span className="text-[#EF4444] text-sm hover:underline break-words">
            {detail}
          </span>
        ) : (
          <p className="text-gray-500 text-sm break-words">{detail}</p>
        )}
      </div>
    </Wrapper>
  );
}
