import axios from "axios";

// Base URL of the backend server
const API_URL = "http://localhost:5000/api/employees";

// Get all employees
export const getEmployees = () => axios.get(API_URL);

// Create a new employee
export const createEmployee = (data) => axios.post(API_URL, data);

// Update an existing employee
export const updateEmployee = (id, data) => axios.put(`${API_URL}/${id}`, data);

// Delete an employee
export const deleteEmployee = (id) => axios.delete(`${API_URL}/${id}`);
