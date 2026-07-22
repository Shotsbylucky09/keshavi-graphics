const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");
const cloudinary = require("./config/cloudinary"); 

// ADD THIS LINE RIGHT HERE:
const db = require("./config/firebase"); 

const app = express();
// ... rest of your code ...

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Configure Multer to temporarily save files in an 'uploads' folder
const upload = multer({ dest: "uploads/" });

// Test Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "🚀 Keshavi Graphics Backend is Running"
    });
});

// Cloudinary Image Upload Route
// Cloudinary + Firebase Upload Route with Debugging
app.post("/upload", upload.single("image"), async (req, res) => {
    console.log("📍 CHECKPOINT 1: Request received from frontend.");
    
    try {
        if (!req.file) {
            console.log("❌ ERROR: No file was found in the request.");
            return res.status(400).json({ error: "No file uploaded" });
        }

        console.log("📍 CHECKPOINT 2: Sending image to Cloudinary...");
        const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
            folder: "keshavi_graphics", 
            resource_type: "auto"       
        });
        console.log("📍 CHECKPOINT 3: Cloudinary success! URL:", cloudinaryResponse.secure_url);

        // Delete the temporary file
        fs.unlinkSync(req.file.path);
        
        // Ensure no undefined values are sent to Firebase (Firestore hates undefined)
        const newProject = {
            title: req.body.title || "Untitled",
            category: req.body.category || "Uncategorized",
            description: req.body.description || "No description",
            imageUrl: cloudinaryResponse.secure_url,
            createdAt: new Date()
        };
        
        console.log("📍 CHECKPOINT 4: Attempting to save to Firebase...");
        
        // This is usually where it hangs!
        const docRef = await db.collection("projects").add(newProject);
        
        console.log("📍 CHECKPOINT 5: Firebase save success! ID:", docRef.id);

        res.status(200).json({ 
            success: true,
            message: "Project published successfully!", 
            imageUrl: cloudinaryResponse.secure_url,
            projectId: docRef.id
        });

    } catch (error) {
        console.error("❌ CRITICAL UPLOAD ERROR:", error);
        res.status(500).json({ error: "Failed to process upload" });
    }
});

// Fetch all uploaded projects from Firebase
// Fetch all uploaded projects from Firebase (With Debugging)
app.get("/projects", async (req, res) => {
    console.log("📍 CHECKPOINT 6: Frontend is requesting projects...");
    
    try {
        const snapshot = await db.collection("projects").orderBy("createdAt", "desc").get();
        console.log("📍 CHECKPOINT 7: Firebase read success! Found", snapshot.docs.length, "projects.");
        
        const projects = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        res.status(200).json({
            success: true,
            projects
        });
    } catch (error) {
        console.error("❌ CRITICAL FETCH ERROR:", error);
        res.status(500).json({ error: "Failed to fetch projects" });
    }
});

// THIS MUST BE THE VERY LAST LINE OF THE FILE:
module.exports = app;