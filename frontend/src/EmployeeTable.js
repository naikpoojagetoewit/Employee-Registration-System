import React from "react";

function EmployeeTable({ employees, onEdit, onDelete }) {
  if (!employees || employees.length === 0) {
    return <p className="no-data">No employees registered yet.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Date of Joining</th>
          <th>Salary</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <tr key={emp._id}>
            <td>{emp.name}</td>
            <td>{emp.email}</td>
            <td>{emp.department}</td>
            <td>
              {emp.dateOfJoining
                ? new Date(emp.dateOfJoining).toLocaleDateString()
                : "-"}
            </td>
            <td>{emp.salary}</td>
            <td>
              <button className="btn btn-edit" onClick={() => onEdit(emp)}>
                Edit
              </button>
              <button
                className="btn btn-delete"
                onClick={() => onDelete(emp._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeTable;
