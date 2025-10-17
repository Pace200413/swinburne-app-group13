export type FAQ = { q: string; a: string; tags?: string[] };
export const FAQS: FAQ[] = [
  {
    q: "I can’t log into Canvas or the Student Portal.",
    a: "Reset your password via the Microsoft login page first. If the issue persists, contact the IT Service Desk with your student ID and a screenshot of the error.",
    tags: ["it", "canvas", "login"],
  },
  {
    q: "The classroom AC or projector isn’t working.",
    a: "Log a ticket with Facilities Helpdesk. Include the room number and a short video/photo if possible.",
    tags: ["facilities", "classroom"],
  },
  {
    q: "Who do I call in an emergency?",
    a: "Dial Campus Security immediately (+60 82 xxxx xxx). For off-campus emergencies, use national emergency services.",
    tags: ["safety", "emergency"],
  },
];
