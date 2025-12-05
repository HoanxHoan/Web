const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const bodyParser = require('body-parser'); // không bắt buộc, dùng express.json()
const Student = require('./Student');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/student_db';

// Middleware
app.use(cors());             // allow requests from frontend
app.use(express.json());     // parse application/json

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/student")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.error("Mongo connection error:", err);
    process.exit(1);
  });

// GET list 
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create new student
app.post('/api/students', async (req, res) => {
  try {
    // Basic validation 
    const { name, age, class: stuClass } = req.body;
    if (!name || age === undefined || !stuClass) {
      return res.status(400).json({ error: 'name, age, class are required' });
    }
    const newStudent = await Student.create({ name, age, class: stuClass });
    res.status(201).json(newStudent);
  } catch (e) {
    // If validation error from mongoose, status 400; else 500
    if (e.name === 'ValidationError') {
      return res.status(400).json({ error: e.message });
    }
    console.error(e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.put('/api/students/:id', async (req, res) => {
  try {
    const updatedStu = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedStu) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(updatedStu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// GET 1 student by ID
app.get('/api/students/:id', async (req, res) => {
  try {
    const stu = await Student.findById(req.params.id);
    if (!stu) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(stu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// DELETE student
app.delete('/api/students/:id', async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Optional: healthcheck
app.get('/api/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
