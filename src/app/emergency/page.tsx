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
    <div className="min-h-screen bg-[#fafafa] pb-20">
      {/* Global header comes from layout.tsx */}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Campus Safety & Emergency Resources
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-2 max-w-3xl mx-auto sm:mx-0">
            Learn what to do during emergencies, where to find exits, and how to
            reach campus safety officers instantly.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 flex items-center">
            <FaExclamationTriangle className="text-[#EF4444] mr-2 flex-shrink-0" />
            What Emergency Services Do
          </h3>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            The campus emergency services provide rapid response and guidance
            during accidents, fires, medical incidents, and security threats.
            They ensure all students and staff are guided safely and promptly to
            secure areas.
          </p>
          <p className="text-gray-600 text-sm sm:text-base mt-3">
            This page links you to vital resources that help you act calmly and
            efficiently during any incident.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <NavCard
            icon={<FaDoorOpen className="text-[#EF4444] w-6 h-6 sm:w-7 sm:h-7" />}
            title="Exit Navigation"
            description="Locate the nearest safe exit and get directions to evacuate quickly."
            href="/exit-navigation"
          />
          <NavCard
            icon={<FaShieldAlt className="text-[#EF4444] w-6 h-6 sm:w-7 sm:h-7" />}
            title="Staying Safe"
            description="View campus safety guidelines, emergency drills, and prevention steps."
            href="/safety"
          />
          <NavCard
            icon={<FaPhoneAlt className="text-[#EF4444] w-6 h-6 sm:w-7 sm:h-7" />}
            title="Emergency Contacts"
            description="Quickly reach campus and local emergency hotlines 24/7."
            href="/security-contact"
          />
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center text-sm sm:text-base text-gray-700">
          <span className="font-medium text-gray-800">Tip:</span> Stay calm,
          follow campus security instructions, and always keep emergency
          numbers saved in your phone.
        </div>
      </main>
    </div>
  );
}

function NavCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col justify-between bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-[#EF4444] transition p-5 sm:p-6"
    >
      <div>
        <div className="flex items-center mb-3 space-x-2">
          {icon}
          <h4 className="font-semibold text-gray-900 text-base sm:text-lg">
            {title}
          </h4>
        </div>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
      <div className="mt-4 text-[#EF4444] text-sm sm:text-base font-medium hover:underline">
        Learn more →
      </div>
    </Link>
  );
}
