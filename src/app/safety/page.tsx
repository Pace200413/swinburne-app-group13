"use client";

import {
  FaFireExtinguisher,
  FaUserShield,
  FaFirstAid,
  FaFlask,
  FaCloudSunRain,
  FaInfoCircle,
  FaHandsHelping,
  FaClinicMedical,
  FaLaptop,
  FaEnvelope,
  FaBoxOpen,
  FaBusAlt,
  FaMapMarkerAlt,
  FaMoon,
  FaPhoneAlt,
  FaComments,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] pb-16">
      {/* Global header comes from layout.tsx */}

      {/* Page Header */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <motion.h1
          className="text-2xl font-semibold text-gray-900"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Staying Safe on Campus
        </motion.h1>
        <p className="text-gray-500 text-sm">
          A guide for students, parents, and visitors to navigate safely and get
          help when needed.
        </p>
      </div>

      {/* Quick Links */}
      <div className="max-w-5xl mx-auto px-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <QuickLink icon={<FaPhoneAlt />} label="Emergency" href="/security-contact" />
          <QuickLink icon={<FaLaptop />} label="IT Help" href="mailto:helpdesk@swin.edu.my" />
          <QuickLink icon={<FaEnvelope />} label="Report" href="mailto:safety@swin.edu.my" />
        </div>
      </div>

      {/* Main Safety Content */}
      <div className="max-w-5xl mx-auto px-6 space-y-6">
        <SafetyCard
          icon={<FaFireExtinguisher className="text-gray-500 w-5 h-5" />}
          title="Fire Safety"
          text="Remain calm and evacuate immediately during a fire. Use stairs, not elevators, and follow exit signs. Alert others and call Campus Security or 999."
        />
        <SafetyCard
          icon={<FaUserShield className="text-gray-500 w-5 h-5" />}
          title="Personal Safety"
          text="Stay alert and aware of your surroundings. Avoid dark or isolated areas at night. If you feel unsafe, contact Campus Security right away."
        />
        <SafetyCard
          icon={<FaFirstAid className="text-gray-500 w-5 h-5" />}
          title="Medical Emergencies"
          text="For urgent medical assistance, call Campus Security (082-260-607) or Emergency Services (999). Remain calm and provide clear details of your location."
        />
        <SafetyCard
          icon={<FaFlask className="text-gray-500 w-5 h-5" />}
          title="Laboratory Safety"
          text="Wear protective gear, follow instructions, and report spills or injuries immediately. Dispose of materials safely and never work alone in the lab."
        />
        <SafetyCard
          icon={<FaCloudSunRain className="text-gray-500 w-5 h-5" />}
          title="Weather & Environmental Hazards"
          text="During severe weather, stay indoors and follow campus alerts. Avoid flooded areas and stay away from tall trees or open spaces during storms."
        />

        <SectionTitle title="Visitor & New Student Help" />
        <SafetyCard
          icon={<FaInfoCircle className="text-gray-500 w-5 h-5" />}
          title="Campus Information Counter"
          text="Located in the ADM Building main lobby. Get directions, visitor passes, or general help. Open weekdays 8:30 AM – 5:00 PM."
        />
        <SafetyCard
          icon={<FaHandsHelping className="text-gray-500 w-5 h-5" />}
          title="Student & Parent Support Office"
          text="Need assistance with student life, safety, or housing? Visit the Student Support Centre or call 082-260-610."
        />

        <SectionTitle title="Lost & Found" />
        <SafetyCard
          icon={<FaBoxOpen className="text-gray-500 w-5 h-5" />}
          title="Report Lost Items"
          text="If you’ve lost something on campus, visit the Campus Security Office or call 082-260-607. Items are held for up to 30 days before disposal."
        />

        <SectionTitle title="Health & Wellness Support" />
        <SafetyCard
          icon={<FaClinicMedical className="text-gray-500 w-5 h-5" />}
          title="On-Campus Health Clinic"
          text="Open Monday to Friday, 9 AM – 4 PM. Provides first aid and general medical assistance. Located next to the Student Centre."
        />
        <SafetyCard
          icon={<FaHandsHelping className="text-gray-500 w-5 h-5" />}
          title="Counselling & Mental Health"
          text="Students can reach out to the Counselling Unit at 082-260-620 or email counselling@swin.edu.my for confidential support."
        />

        <SectionTitle title="Tech & Access Help" />
        <SafetyCard
          icon={<FaLaptop className="text-gray-500 w-5 h-5" />}
          title="IT Service Desk"
          text="Having trouble accessing Wi-Fi or your student portal? Visit the IT Service Desk or email helpdesk@swin.edu.my for assistance."
        />

        <SectionTitle title="Campus Navigation & Transportation" />
        <SafetyCard
          icon={<FaBusAlt className="text-gray-500 w-5 h-5" />}
          title="Campus Shuttle"
          text="A free shuttle service runs between main campus buildings from 8 AM to 6 PM. Check schedules on the Swinburne app or information boards."
        />
        <SafetyCard
          icon={<FaMapMarkerAlt className="text-gray-500 w-5 h-5" />}
          title="Visitor Parking"
          text="Visitors can park near the ADM Building. Parking permits are available from the Information Counter."
        />

        <SectionTitle title="Security Escort & Night Transport" />
        <SafetyCard
          icon={<FaMoon className="text-gray-500 w-5 h-5" />}
          title="Campus Night Escort"
          text="Security escorts are available after dark to accompany you safely between buildings. Call 082-260-607 to request assistance."
        />

        <SectionTitle title="Emergency Assembly Points" />
        <SafetyCard
          icon={<FaMapMarkerAlt className="text-gray-500 w-5 h-5" />}
          title="Designated Assembly Areas"
          text="After evacuating any building, proceed calmly to your nearest assembly point marked with a green 'Meeting Point' sign. Stay until all-clear."
        />

        <SectionTitle title="Report or Give Feedback" />
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center">
          <FaComments className="text-gray-500 w-6 h-6 mx-auto mb-3" />
          <h2 className="font-semibold text-gray-800 mb-2">We Value Your Feedback</h2>
          <p className="text-sm text-gray-600 mb-4">
            Have a concern, suggestion, or safety issue? Let us know so we can
            improve campus safety and support.
          </p>
          <a
            href="mailto:safety@swin.edu.my"
            className="inline-block bg-red-600 text-white text-sm font-medium rounded-lg px-4 py-2 hover:bg-red-700 transition"
          >
            Send Feedback
          </a>
        </div>
      </div>
    </div>
  );
}

/* --- Reusable Components --- */
function SafetyCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-2">
        {icon}
        <h2 className="font-semibold text-gray-800">{title}</h2>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h3 className="text-lg font-semibold text-gray-800 pt-4 pb-1 border-b border-gray-100">
      {title}
    </h3>
  );
}

function QuickLink({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow transition p-4 text-gray-700"
    >
      <div className="text-gray-500 text-lg mb-1">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}
