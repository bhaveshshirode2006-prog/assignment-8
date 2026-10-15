const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

// MongoDB connection
mongoose
.connect("mongodb+srv://bhaveshshirode2006_db_user:bhavesh302006@cluster0.ht1ahhh.mongodb.net/studentDB?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("MongoDB Connected Successfully"))
.catch((error) => console.log("MongoDB Connection Error:", error.message));

// Student Schema
const studentSchema = new mongoose.Schema({
name: {
type: String,
required: true,
},
rollNo: {
type: String,
required: true,
unique: true,
},
department: {
type: String,
required: true,
},
marks: {
type: Number,
required: true,
},
});

// Student Model
const Student = mongoose.model("Student", studentSchema);

// Test route
app.get("/", (req, res) => {
res.send("Student API is running!");
});

// Create student
app.post("/students", async (req, res) => {
try {
const student = await Student.create(req.body);
res.status(201).json(student);
} catch (error) {
res.status(400).json({ message: error.message });
}
});

// Read all students
app.get("/students", async (req, res) => {
try {
const students = await Student.find();
res.json(students);
} catch (error) {
res.status(500).json({ message: error.message });
}
});

// Read one student
app.get("/students/:id", async (req, res) => {
try {
const student = await Student.findById(req.params.id);

if (!student) {
  return res.status(404).json({ message: "Student not found" });
}

res.json(student);


} catch (error) {
res.status(400).json({ message: error.message });
}
});

// Update student
app.put("/students/:id", async (req, res) => {
try {
const student = await Student.findByIdAndUpdate(
req.params.id,
req.body,
{ new: true, runValidators: true }
);


if (!student) {
  return res.status(404).json({ message: "Student not found" });
}

res.json(student);


} catch (error) {
res.status(400).json({ message: error.message });
}
});

// Delete student
app.delete("/students/:id", async (req, res) => {
try {
const student = await Student.findByIdAndDelete(req.params.id);


if (!student) {
  return res.status(404).json({ message: "Student not found" });
}

res.json({ message: "Student deleted successfully" });

} catch (error) {
res.status(400).json({ message: error.message });
}
});

// Start server
const PORT = 5000;

app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});
