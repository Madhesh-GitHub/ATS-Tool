import React from "react";
import { Link } from "react-router-dom";
const LostPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <img src="/No data-amico.png" alt="Lost Page" className="w-full max-w-md mb-8"/>
      <h1 className="text-5xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-6">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"> Go Back Home </Link>
    </div>
  );
};

export default LostPage;
