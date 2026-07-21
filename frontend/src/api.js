import axios from "axios";

// Base URL of the backend server.
// In development, falls back to localhost. In production (Netlify),
// set REACT_APP_API_URL in the Netlify dashboard to your Render backend URL,
// e.g. https://employee-crud-backend.onrender.com/api/employees
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/employees";

// Get all employees
export const getEmployees = () => axios.get(API_URL);

// Create a new employee
export const createEmployee = (data) => axios.post(API_URL, data);

// Update an existing employee
export const updateEmployee = (id, data) => axios.put(`${API_URL}/${id}`, data);

// Delete an employee
export const deleteEmployee = (id) => axios.delete(`${API_URL}/${id}`);
