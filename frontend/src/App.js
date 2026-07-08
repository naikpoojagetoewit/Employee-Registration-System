import React, { useState, useEffect } from "react";
import EmployeeForm from "./EmployeeForm";
import EmployeeTable from "./EmployeeTable";
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from "./api";

function App() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Fetch all employees from backend
  const fetchEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  // Load employees when the component first mounts
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handles both Create and Update depending on whether we're editing
  const handleSubmit = async (formData) => {
    try {
      if (editingEmployee) {
        await updateEmployee(editingEmployee._id, formData);
      } else {
        await createEmployee(formData);
      }
      setEditingEmployee(null);
      fetchEmployees(); // Refresh table after create/update
    } catch (err) {
      console.error("Error saving employee:", err);
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await deleteEmployee(id);
      fetchEmployees(); // Refresh table after delete
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  const handleCancelEdit = () => {
    setEditingEmployee(null);
  };

  return (
    <div className="container">
      <h1>Employee Registration System</h1>

      <EmployeeForm
        onSubmit={handleSubmit}
        editingEmployee={editingEmployee}
        onCancelEdit={handleCancelEdit}
      />

      <EmployeeTable
        employees={employees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
