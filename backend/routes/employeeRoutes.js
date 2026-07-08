const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

// CREATE - Add a new employee
router.post("/", async (req, res) => {
  try {
    const { name, email, department, dateOfJoining, salary } = req.body;

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email are required" });
    }

    const newEmployee = new Employee({
      name,
      email,
      department,
      dateOfJoining,
      salary,
    });

    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ - Get all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ - Get a single employee by ID (useful when loading into edit form)
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE - Update an employee by ID
router.put("/:id", async (req, res) => {
  try {
    const { name, email, department, dateOfJoining, salary } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email are required" });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, email, department, dateOfJoining, salary },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE - Remove an employee by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
