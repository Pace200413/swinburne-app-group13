import type { Service } from "../types/support";

export const SERVICES: Service[] = [
  {
    slug: "it-service-desk",
    name: "IT Service Desk",
    category: "IT Support",
    desc: "Accounts, Wi-Fi, Canvas, Student Portal issues.",
    hours: "Mon–Fri 9:00–17:00",
    email: "itservicedesk@swin.edu.my",
  },
  {
    slug: "facilities-helpdesk",
    name: "Facilities Helpdesk",
    category: "Facilities",
    desc: "Air-con, lighting, classroom equipment, maintenance.",
    hours: "Mon–Fri 9:00–17:00",
    email: "facilities@swin.edu.my",
  },
  {
    slug: "campus-security",
    name: "Campus Security",
    category: "Safety",
    desc: "Emergencies & safety on campus.",
    hours: "24/7",
    phone: "+60 82 xxxx xxx",
  },
  {
    slug: "student-wellbeing",
    name: "Student Wellbeing",
    category: "Wellbeing",
    desc: "Counselling, wellbeing support, referrals.",
    hours: "Mon–Fri 9:00–17:00",
    email: "wellbeing@swin.edu.my",
  },
  {
    slug: "library-help",
    name: "Library Help",
    category: "Academic",
    desc: "Library services, research help, referencing.",
    hours: "Mon–Fri 9:00–17:00",
    email: "library@swin.edu.my",
  },
];
