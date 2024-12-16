import React, { useState, useEffect } from "react";
import { getStaff, deleteStaff, createStaff, updateStaff } from "../api/api"; // import API functions

const StaffTable = () => {
  const [staff, setStaff] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  // Fetch staff on initial render
  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await getStaff();
      setStaff(response.data);
    } catch (error) {
      console.error("Error fetching staff:", error);
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
    const { name, email, phoneNumber } = formData;

    if (!name || !email || !phoneNumber) {
      alert("All fields are required");
      return;
    }

    try {
      if (currentStaff) {
        // Update existing staff member
        await updateStaff(currentStaff.id, formData);
      } else {
        // Add new staff member
        await createStaff(formData);
      }
      fetchStaff();
      setShowForm(false); // Hide form after submission
      setCurrentStaff(null); // Reset current staff
      setFormData({ name: "", email: "", phoneNumber: "" }); // Reset form data
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Handle staff deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      try {
        await deleteStaff(id);
        fetchStaff();
      } catch (error) {
        console.error("Error deleting staff:", error);
      }
    }
  };

  const handleEdit = (staffMember) => {
    setFormData({
      name: staffMember.name,
      email: staffMember.email,
      phoneNumber: staffMember.phoneNumber,
    });
    setCurrentStaff(staffMember);
    setShowForm(true);
  };

  return (
    <div className="relative">
      {/* Dark overlay when form is shown */}
      {showForm && (
        <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      )}

      {/* Add/Edit Staff Form */}
      {showForm && (
        <div className="fixed inset-0 flex justify-center items-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl mb-4">
              {currentStaff ? "Edit Staff Member" : "Add New Staff Member"}
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
                <label className="block mb-2">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
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
                  {currentStaff ? "Save Changes" : "Add Staff Member"}
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

      {/* Table of Staff Members */}
      <div className="mb-4">
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Add New Staff Member
        </button>
      </div>

      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Email</th>
            <th className="px-4 py-2 border-b">Phone Number</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((staffMember) => (
            <tr key={staffMember.id}>
              <td className="px-4 py-2 border-b">{staffMember.name}</td>
              <td className="px-4 py-2 border-b">{staffMember.email}</td>
              <td className="px-4 py-2 border-b">{staffMember.phoneNumber}</td>
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => handleEdit(staffMember)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded-lg mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(staffMember.id)}
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

export default StaffTable;
