import React, { useState, useEffect } from "react";
import {
  getMembers,
  deleteMember,
  createMember,
  updateMember,
} from "../api/api"; // import API functions

const MembersTable = () => {
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  // Fetch members on initial render
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await getMembers();
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  // Handle form field changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle add/edit form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { name, email, address } = formData;

    if (!name || !email || !address) {
      alert("All fields are required");
      return;
    }

    try {
      if (currentMember) {
        // Update existing member
        await updateMember(currentMember.id, formData);
      } else {
        // Add new member
        await createMember(formData);
      }
      fetchMembers();
      setShowForm(false); // Hide form after submission
      setCurrentMember(null); // Reset current member
      setFormData({ name: "", email: "", address: "" }); // Reset form data
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Handle member deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        await deleteMember(id);
        fetchMembers();
      } catch (error) {
        console.error("Error deleting member:", error);
      }
    }
  };

  const handleEdit = (member) => {
    setFormData({
      name: member.name,
      email: member.email,
      address: member.address,
    });
    setCurrentMember(member);
    setShowForm(true);
  };

  return (
    <div className="relative">
      {/* Dark overlay when form is shown */}
      {showForm && (
        <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      )}

      {/* Add/Edit Member Form */}
      {showForm && (
        <div className="fixed inset-0 flex justify-center items-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl mb-4">
              {currentMember ? "Edit Member" : "Add New Member"}
            </h3>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg"
                >
                  {currentMember ? "Save Changes" : "Add Member"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table of Members */}
      <div className="mb-4">
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Add New Member
        </button>
      </div>

      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Email</th>
            <th className="px-4 py-2 border-b">Address</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td className="px-4 py-2 border-b">{member.name}</td>
              <td className="px-4 py-2 border-b">{member.email}</td>
              <td className="px-4 py-2 border-b">{member.address}</td>
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => handleEdit(member)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded-lg mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MembersTable;
