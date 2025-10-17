"use client";

import { FaCalendarAlt, FaBookmark, FaBullhorn } from "react-icons/fa";
import Link from "next/link";
import SubpageLayout from "@/components/SubpageLayout";

export default function EventsPage() {
  return (
    <SubpageLayout
      icon={<span>📅</span>}
      title="Events"
      description="Stay updated with upcoming activities."
      extra={
        <div>
          <h2 className="text-lg font-semibold mb-4">Coming Up</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-xl border bg-white p-3 shadow-sm hover:shadow-md">
              <h4 className="font-medium">Orientation</h4>
              <p className="text-xs text-gray-600">10/02/2025 · A002 Lecture Hall</p>
            </div>
            <div className="rounded-xl border bg-white p-3 shadow-sm hover:shadow-md">
              <h4 className="font-medium">AI Student Meetup</h4>
              <p className="text-xs text-gray-600">05/03/2025 · Innovation Hub</p>
            </div>
            <div className="rounded-xl border bg-white p-3 shadow-sm hover:shadow-md">
              <h4 className="font-medium">Career Fair</h4>
              <p className="text-xs text-gray-600">02/04/2025 · Atrium</p>
            </div>
          </div>
        </div>
      }
    >
      <Link href="/events/list" className="rounded-xl border bg-yellow-50 p-6 text-center shadow hover:shadow-md transition">
        <FaCalendarAlt className="mx-auto text-yellow-600 w-6 h-6" />
        <p className="mt-2 font-medium">All Events</p>
      </Link>
      <Link href="/favourites" className="rounded-xl border bg-yellow-50 p-6 text-center shadow hover:shadow-md transition">
        <FaBookmark className="mx-auto text-yellow-600 w-6 h-6" />
        <p className="mt-2 font-medium">Bookmarks</p>
      </Link>
      <Link href="/orientation" className="rounded-xl border bg-yellow-50 p-6 text-center shadow hover:shadow-md transition">
        <FaBullhorn className="mx-auto text-yellow-600 w-6 h-6" />
        <p className="mt-2 font-medium">Orientation</p>
      </Link>
    </SubpageLayout>
  );
}
