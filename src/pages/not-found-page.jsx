import React from "react";
import { FiAlertCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex h-[70dvh] flex-col items-center justify-center bg-red-50/50 text-gray-800">
      <FiAlertCircle className="mb-6 h-24 w-24 text-red-500" />
      <h1 className="mb-4 text-6xl font-bold">404</h1>
      <p className="mb-6 text-2xl">Oops! Page not found.</p>
      <Link
        to="/"
        className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  );
}
