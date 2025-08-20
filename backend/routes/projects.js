const express = require("express");
const multer = require("multer");
const path = require("path");
const Project = require("../models/Project");

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Folder where images are stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage: storage });

// Add new project with image
router.post("/", upload.single("image"), async (req, res) => {
    try {
        const { title, description, category } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Image file is required." });
        }

        const project = new Project({
            title,
            description,
            category,
            image: `/uploads/${req.file.filename}` // Save relative path
        });

        await project.save();
        res.status(201).json(project);
    } catch (err) {
        console.error("Save error:", err);
        res.status(500).json({ message: "Failed to add project" });
    }
});

module.exports = router;
