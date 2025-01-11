const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const User = require("./models/user");
const Patient = require('./models/patient')
const Staff = require('./models/staff')
const db = require("./db");
const bcrypt = require("bcrypt");

require("dotenv").config();
app.use(bodyParser.json());
app.use(express.json());

const cors = require("cors");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const PORT = process.env.PORT || 3000;

app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "Invalid email" });
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password); // Assuming passwords are hashed

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Login successful
    res.status(200).json({ message: "Login successful", email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/patient", async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json({ message: "Patient data entered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/patient/detail", async (req, res) => {
  try {
    // Await the database call
    const details = await Patient.find();
    
    // Return the patient details as JSON
    return res.status(200).json(details);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error); // Optional: log the error for debugging
    return res.status(500).json({ error: "Internal server error" });
  }
});


app.delete('/details/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Patient.findByIdAndDelete(id); // Replace 'Patient' with your model name
    if (!result) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});




app.post("/staff", async (req, res) => {
  try {
    const staff = new Staff(req.body);
    await staff.save();
    res.status(201).json(staff);
  } catch (err) {
    res.status(500).json({ message: "Error in adding staff", error: err });
  }
});

app.get("/staffDetail", async (req, res) => {
  try {
   
    const staffDetails = await Staff.find(); 

    
    if (!staffDetails) {
      return res.status(404).json({ message: "No staff details found" });
    }

   
    res.status(200).json(staffDetails);
  } catch (error) {
    console.error("Error fetching staff details:", error);
    res.status(500).json({ message: "Error fetching staff details", error: error.message });
  }
});

app.delete("/staffDetail/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedStaff = await Staff.findByIdAndDelete(id);
    if (!deletedStaff) {
      return res.status(404).json({ message: "Staff member not found" });
    }
    res.status(200).json({ message: "Staff member deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting staff member", error });
  }
});




app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
