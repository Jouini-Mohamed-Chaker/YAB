import React, { useState } from "react";
import BooksTable from "../components/BooksTable";
import MembersTable from "../components/MembersTable";
import StaffTable from "../components/StaffTable";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("books");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6">
      {/* Admin Dashboard Navigation */}
      <div className="flex space-x-6 mb-6">
        <button
          onClick={() => handleTabChange("books")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "books"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Books
        </button>
        <button
          onClick={() => handleTabChange("members")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "members"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Members
        </button>
        <button
          onClick={() => handleTabChange("staff")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "staff"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Staff
        </button>
      </div>

      {/* Content Area for Tables */}
      <div className="w-full max-w-4xl p-4 bg-white shadow-lg rounded-lg transition-all ease-in-out duration-300">
        {activeTab === "books" && <BooksTable />}
        {activeTab === "members" && <MembersTable />}
        {activeTab === "staff" && <StaffTable />}
      </div>
    </div>
  );
};

export default Dashboard;
