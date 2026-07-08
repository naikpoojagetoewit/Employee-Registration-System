import React, { useState, useEffect } from "react";

// initialState defines the empty/default shape of the form
const initialState = {
  name: "",
  email: "",
  department: "HR",
  dateOfJoining: "",
  salary: "",
};

function EmployeeForm({ onSubmit, editingEmployee, onCancelEdit }) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  // When "editingEmployee" changes (Edit button clicked), fill the form
  useEffect(() => {
    if (editingEmployee) {
      setFormData({
        name: editingEmployee.name || "",
        email: editingEmployee.email || "",
        department: editingEmployee.department || "HR",
        // Format date to yyyy-mm-dd for the <input type="date">
        dateOfJoining: editingEmployee.dateOfJoining
          ? editingEmployee.dateOfJoining.substring(0, 10)
          : "",
        salary: editingEmployee.salary || "",
      });
    } else {
      setFormData(initialState);
    }
  }, [editingEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Employee name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    onSubmit(formData); // Parent (App.js) decides create vs update
    setFormData(initialState);
  };

  const handleCancel = () => {
    setFormData(initialState);
    setErrors({});
    onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingEmployee ? "Edit Employee" : "Add New Employee"}</h2>

      <div className="form-row">
        <div className="form-group">
          <label>Employee Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
            <option value="Sales">Sales</option>
            <option value="Finance">Finance</option>
          </select>
        </div>

        <div className="form-group">
          <label>Date of Joining</label>
          <input
            type="date"
            name="dateOfJoining"
            value={formData.dateOfJoining}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Salary</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        {editingEmployee ? "Update Employee" : "Add Employee"}
      </button>

      {editingEmployee && (
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default EmployeeForm;
