import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./Routes/userRoute.js";
import { connectDB } from "./Configure/db.js";
import config from "./Configure/config.js";
import uploadRoutes from "./Routes/uploadRoute.js";
import blogRoute from "./Routes/blogRoute.js";
import resumeRoute from "./Routes/resumeRoute.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Get directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/uploads", uploadRoutes);
app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);
app.use("/api", resumeRoute);

// Enhanced save route with session management
app.post("/save", (req, res) => {
  const { step, data, sessionId } = req.body;

  if (!step || !data) {
    return res.status(400).send("Missing 'step' or 'data' in request body");
  }

  try {
    // Generate session ID if not provided
    const currentSessionId = sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Create session-specific file
    const sessionFile = path.join(uploadsDir, `resume_data_${currentSessionId}.txt`);
    
    // Format the data
    const formatted = `\n=== ${step.toUpperCase()} DATA ===\n` +
      Object.entries(data)
        .map(([key, val]) => {
          if (Array.isArray(val)) {
            return `${key}: ${val
              .map(item => typeof item === "object" ? JSON.stringify(item) : item)
              .join(", ")}`;
          } else if (typeof val === "object") {
            return `${key}: ${JSON.stringify(val)}`;
          } else {
            return `${key}: ${val}`;
          }
        })
        .join("\n");

    // Append to session file
    fs.appendFileSync(sessionFile, formatted + "\n");
    
    console.log(`✅ Data saved for session: ${currentSessionId}`);
    console.log(`📁 File: ${sessionFile}`);
    
    res.json({
      success: true,
      message: "Data saved successfully",
      sessionId: currentSessionId
    });

  } catch (err) {
    console.error("❌ Error saving data:", err);
    res.status(500).json({
      success: false,
      message: "Failed to save data",
      error: err.message
    });
  }
});

// New route to start a fresh session
app.post("/start-session", (req, res) => {
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  res.json({
    success: true,
    sessionId: sessionId,
    message: "New session started"
  });
});

// Route to get session data
app.get("/session/:sessionId", (req, res) => {
  const { sessionId } = req.params;
  const sessionFile = path.join(uploadsDir, `resume_data_${sessionId}.txt`);
  
  if (!fs.existsSync(sessionFile)) {
    return res.status(404).json({
      success: false,
      message: "Session not found"
    });
  }
  
  try {
    const data = fs.readFileSync(sessionFile, 'utf-8');
    res.json({
      success: true,
      data: data,
      sessionId: sessionId
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error reading session data"
    });
  }
});

// Route to clear session data
app.delete("/session/:sessionId", (req, res) => {
  const { sessionId } = req.params;
  const sessionFile = path.join(uploadsDir, `resume_data_${sessionId}.txt`);
  
  if (fs.existsSync(sessionFile)) {
    fs.unlinkSync(sessionFile);
  }
  
  res.json({
    success: true,
    message: "Session cleared"
  });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

// Start server after DB connection
const startServer = async () => {
  try {
    await connectDB();
    app.listen(config.port, () => {
      console.log(`🚀 Server is running on port ${config.port}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();