const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const reviewRoutes = require('./routes/Review'); // ✅ case-sensitive match

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

// Use review routes
app.use('/api/reviews', reviewRoutes); // example endpoint

//Projects in admin
const projectRoutes = require("./routes/projects");
app.use("/api/projects", projectRoutes);

// image upload
const uploadRoutes = require('./routes/upload');
app.use('/api', uploadRoutes);
app.use('/uploads', express.static('uploads')); // serve uploaded images


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
