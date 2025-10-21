"use client";

import Link from "next/link";
import {
  FaDoorOpen,
  FaShieldAlt,
  FaPhoneAlt,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function EmergencyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-28">
      {/* Sticky top bar */}
      <div className="sticky top-[56px] md:top-[68px] z-20 bg-white/90 backdrop-blur border-b border-gray-200">
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
            <FaDoorOpen className="mr-2" /> Exit Navigation
          </Link>
        </div>
      </div>

      <div className="min-h-screen bg-[#fafafa] pb-16">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-semibold text-gray-900">Emergency Services</h1>
          <p className="text-gray-500 text-sm max-w-2xl">
            Learn what to do during emergencies, how to stay safe on campus, and where to go when immediate help is needed.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-6 mb-10">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
              <FaExclamationTriangle className="text-red-600 mr-2" />
              What Emergency Services Do
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              The campus emergency services provide rapid response and guidance during accidents, fires, medical incidents, and security threats.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-5 pb-[env(safe-area-inset-bottom)]">
          <NavCard
            icon={<FaDoorOpen className="text-red-600 w-6 h-6" />}
            title="Exit Navigation"
            description="Find the nearest safe exit and follow directions to evacuate quickly."
            href="/exit-navigation"
          />
          <NavCard
            icon={<FaShieldAlt className="text-red-600 w-6 h-6" />}
            title="Staying Safe"
            description="Learn safety tips, emergency procedures, and how to stay prepared."
            href="/safety"
          />
          <NavCard
            icon={<FaPhoneAlt className="text-red-600 w-6 h-6" />}
            title="Emergency Contacts"
            description="Get quick access to campus and public emergency hotlines."
            href="/security-contact"
          />
        </div>
      </div>
    </div>
  );
}

function NavCard({ icon, title, description, href }: any) {
  return (
    <Link
      href={href}
      className="flex flex-col justify-between bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-[#EF4444] transition p-6"
    >
      <div>
        <div className="flex items-center mb-3 space-x-2">
          {icon}
          <h2 className="font-semibold text-gray-900 text-lg">{title}</h2>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="mt-4 text-[#EF4444] text-sm font-medium hover:underline">
        Learn more →
      </div>
    </Link>
  );
}
