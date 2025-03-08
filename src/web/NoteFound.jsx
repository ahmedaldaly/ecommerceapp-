import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-9xl font-bold text-blue-600 animate-bounce">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mt-4">
        الصفحة غير موجودة!
      </h2>
      <p className="text-gray-500 mt-2">
        يبدو أنك وصلت إلى صفحة غير موجودة، تحقق من الرابط أو عد إلى الصفحة الرئيسية.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        العودة إلى الصفحة الرئيسية
      </Link>
    </div>
  );
};

export default NotFound;
