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
import jwt from 'jsonwebtoken';

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

// Enhanced save route with user-based file management
app.post("/save", (req, res) => {
  const { step, data } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  console.log('🔍 Debug Info:');
  console.log('- Authorization Header:', req.headers.authorization ? 'Present' : 'Missing');
  console.log('- Extracted Token:', token ? 'Present' : 'Missing');
  
  if (!step || !data) {
    return res.status(400).json({
      success: false,
      message: "Missing 'step' or 'data' in request body"
    });
  }

  try {
    let sessionId;
    let userId = 'anonymous';

    // Extract user ID from JWT token
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.userId;
        console.log('👤 User authenticated successfully:', userId);
      } catch (jwtError) {
        console.log('⚠️ JWT verification failed:', jwtError.message);
        console.log('🔑 Token value:', token ? token.substring(0, 20) + '...' : 'null');
      }
    } else {
      console.log('⚠️ No token provided, using anonymous session');
    }

    // Look for existing user file FIRST
    const files = fs.readdirSync(uploadsDir);
    const existingUserFiles = files.filter(file => 
      file.startsWith(`resume_data_user_${userId}_`) && file.endsWith('.txt')
    );

    console.log('📂 Looking for files matching pattern:', `resume_data_user_${userId}_*.txt`);
    console.log('📁 Found existing files:', existingUserFiles);

    let sessionFile;
    
    if (existingUserFiles.length > 0) {
      // ✅ USE EXISTING FILE - Don't create new sessionId
      const latestFile = existingUserFiles.sort().reverse()[0];
      sessionFile = path.join(uploadsDir, latestFile);
      
      // Extract EXISTING session ID from file name
      const fileMatch = latestFile.match(/resume_data_(user_[^.]+)\.txt/);
      if (fileMatch) {
        sessionId = fileMatch[1];  // ✅ Use existing sessionId
      }
      
      console.log('📂 Using existing file for user:', latestFile);
      console.log('🔄 Reusing sessionId:', sessionId);
      
    } else {
      // ✅ CREATE NEW FILE only if no existing file
      sessionId = `user_${userId}_${Date.now()}`;
      sessionFile = path.join(uploadsDir, `resume_data_${sessionId}.txt`);
      console.log('📄 Creating new file for user:', `resume_data_${sessionId}.txt`);
    }
    
    // Check if this step already exists in the file
    let existingContent = '';
    if (fs.existsSync(sessionFile)) {
      existingContent = fs.readFileSync(sessionFile, 'utf-8');
    }

    // Remove existing data for this step if it exists
    const stepPattern = new RegExp(`=== ${step.toUpperCase()} DATA ===[\\s\\S]*?(?=\\n=== |$)`, 'g');
    existingContent = existingContent.replace(stepPattern, '').trim();

    // Format the new data
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

    // Write updated content to file
    const finalContent = existingContent + formatted + "\n";
    fs.writeFileSync(sessionFile, finalContent);
    
    console.log(`✅ Data saved for user ${userId}, step: ${step}`);
    console.log(`📁 Using file: ${sessionFile}`);
    console.log(`🆔 SessionId: ${sessionId}`);
    
    res.json({
      success: true,
      message: "Data saved successfully",
      sessionId: sessionId,
      userId: userId,
      fileName: path.basename(sessionFile)  // Added for debugging
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

// Route to start a fresh session (clear existing data)
app.post("/start-fresh", (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  try {
    let userId = 'anonymous';

    // Extract user ID from JWT token
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.userId;
      } catch (jwtError) {
        console.log('⚠️ Invalid token, using anonymous session');
      }
    }

    // Remove all existing files for this user
    const files = fs.readdirSync(uploadsDir);
    const userFiles = files.filter(file => 
      file.startsWith(`resume_data_user_${userId}_`) && file.endsWith('.txt')
    );

    userFiles.forEach(file => {
      const filePath = path.join(uploadsDir, file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log('🗑️ Deleted old file:', file);
      }
    });

    // Create new session ID
    const newSessionId = `user_${userId}_${Date.now()}`;
    
    res.json({
      success: true,
      sessionId: newSessionId,
      userId: userId,
      message: "Fresh session started - all previous data cleared"
    });

  } catch (err) {
    console.error("❌ Error starting fresh session:", err);
    res.status(500).json({
      success: false,
      message: "Failed to start fresh session",
      error: err.message
    });
  }
});

// Route to get current user's resume data
app.get("/get-user-data", (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  try {
    let userId = 'anonymous';

    // Extract user ID from JWT token
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.userId;
      } catch (jwtError) {
        return res.status(401).json({
          success: false,
          message: "Invalid authentication token"
        });
      }
    }

    // Look for existing user file
    const files = fs.readdirSync(uploadsDir);
    const userFiles = files.filter(file => 
      file.startsWith(`resume_data_user_${userId}_`) && file.endsWith('.txt')
    );

    if (userFiles.length === 0) {
      return res.json({
        success: true,
        hasData: false,
        message: "No existing data found for user"
      });
    }

    // Get the latest file
    const latestFile = userFiles.sort().reverse()[0];
    const filePath = path.join(uploadsDir, latestFile);
    const data = fs.readFileSync(filePath, 'utf-8');

    // Extract session ID
    const fileMatch = latestFile.match(/resume_data_(user_[^.]+)\.txt/);
    const sessionId = fileMatch ? fileMatch[1] : null;

    res.json({
      success: true,
      hasData: true,
      data: data,
      sessionId: sessionId,
      fileName: latestFile,
      userId: userId
    });

  } catch (err) {
    console.error("❌ Error getting user data:", err);
    res.status(500).json({
      success: false,
      message: "Failed to get user data",
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

// 🚀 NEW ROUTE FOR RESUME GENERATION FROM BUILDER DATA
app.post("/generate-resume-from-builder", async (req, res) => {
  try {
    const { sessionId } = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    if (!sessionId && !token) {
      return res.status(400).json({
        success: false,
        message: "Session ID or authentication token required"
      });
    }

    console.log('🎯 Generating resume from builder data...');

    let builderDataFile;

    if (sessionId) {
      // Use provided session ID
      builderDataFile = path.join(uploadsDir, `resume_data_${sessionId}.txt`);
    } else {
      // Extract user ID from token and find their latest resume data
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        
        // Look for user-specific files
        const files = fs.readdirSync(uploadsDir);
        const userFiles = files.filter(file => 
          file.startsWith('resume_data_') && file.includes(userId)
        );
        
        if (userFiles.length === 0) {
          // Fallback: look for any session files for this user
          const sessionFiles = files.filter(file => file.startsWith('resume_data_session_'));
          if (sessionFiles.length > 0) {
            // Get the most recent session file
            const sortedFiles = sessionFiles.sort().reverse();
            builderDataFile = path.join(uploadsDir, sortedFiles[0]);
          } else {
            return res.status(404).json({
              success: false,
              message: "No resume builder data found. Please fill the resume builder forms first."
            });
          }
        } else {
          // Use the most recent user file
          const sortedUserFiles = userFiles.sort().reverse();
          builderDataFile = path.join(uploadsDir, sortedUserFiles[0]);
        }
      } catch (jwtError) {
        return res.status(401).json({
          success: false,
          message: "Invalid authentication token"
        });
      }
    }

    // Check if builder data file exists
    if (!fs.existsSync(builderDataFile)) {
      return res.status(404).json({
        success: false,
        message: "Resume builder data not found. Please complete the resume builder forms first."
      });
    }

    console.log('📄 Found builder data file:', builderDataFile);

    // Read the builder data
    const builderData = fs.readFileSync(builderDataFile, 'utf-8');
    console.log('📊 Builder data length:', builderData.length);

    // Create a unique session for this generation
    const generationId = `builder_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Copy builder data to parsed_content directory (where the existing pipeline expects it)
    const parsedDir = path.join(process.cwd(), 'parsed_content');
    if (!fs.existsSync(parsedDir)) {
      fs.mkdirSync(parsedDir, { recursive: true });
    }
    
    const parsedFile = path.join(parsedDir, `resume_${generationId}.txt`);
    fs.writeFileSync(parsedFile, builderData, 'utf-8');
    
    console.log('📁 Copied to parsed_content:', `resume_${generationId}.txt`);

    // Now use the existing ATS generation pipeline
    const { convertTxtToJson } = await import('./Utils/convertTxtToJson.js');
    
    console.log('🤖 Converting to JSON...');
    const conversionResult = await convertTxtToJson(`resume_${generationId}.txt`);
    
    if (!conversionResult.success) {
      throw new Error('Failed to convert resume data to JSON');
    }

    console.log('✅ JSON conversion successful');

    // Use the existing HTML generation function
    const jsonData = conversionResult.data;
    
    // Generate HTML using the helper function
    const resumeHTML = generateBuilderResumeHTML(jsonData);

    console.log('🎨 HTML generation complete');

    res.json({
      success: true,
      message: 'Resume generated successfully from builder data',
      data: jsonData,
      html: resumeHTML,
      generationId: generationId,
      sourceFile: path.basename(builderDataFile)
    });

  } catch (error) {
    console.error('❌ Error generating resume from builder:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating resume from builder data',
      error: error.message
    });
  }
});

// Helper function to generate HTML
const generateBuilderResumeHTML = (data) => {
  // Helper function to ensure array format
  const ensureArray = (item) => {
    if (Array.isArray(item)) return item;
    if (typeof item === 'string') return [item];
    return [];
  };

  // Helper to parse JSON strings in skills
  const parseSkills = (skillsData) => {
    if (!skillsData) return {};
    
    const skills = {};
    
    if (skillsData.technicalSkills) {
      try {
        // Handle both JSON string and regular string
        if (skillsData.technicalSkills.includes('{')) {
          const techSkills = skillsData.technicalSkills.split(', ').map(skill => {
            try {
              const parsed = JSON.parse(skill);
              return `${parsed.name} (${parsed.proficiency})`;
            } catch {
              return skill;
            }
          });
          skills['Technical Skills'] = techSkills;
        } else {
          skills['Technical Skills'] = [skillsData.technicalSkills];
        }
      } catch {
        skills['Technical Skills'] = [skillsData.technicalSkills];
      }
    }
    
    if (skillsData.softSkills) {
      skills['Soft Skills'] = [skillsData.softSkills];
    }
    
    if (skillsData.industrySkills) {
      skills['Industry Skills'] = [skillsData.industrySkills];
    }
    
    return skills;
  };

  // Extract and structure the data
  const resumeData = {
    name: data.name || `${data.firstName || ''} ${data.lastName || ''}`.trim(),
    email: data.email || '',
    phone: data.phone || '',
    location: data.location || [data.street, data.city, data.state, data.zip, data.country].filter(Boolean).join(', '),
    linkedin: data.linkedin || data.linkedIn || '',
    portfolio: data.portfolio || '',
    headline: data.headline || '',
    skills: data.skills || parseSkills(data),
    experience: data.experience || [],
    education: data.education || [],
    achievements: data.achievements || [],
    certifications: data.certifications || [],
    languages: data.languages || []
  };

  return `
    <div class="max-w-4xl mx-auto bg-white p-8 font-sans text-gray-900 leading-relaxed" style="font-size: 14px; line-height: 1.6;">
      <!-- Header -->
      <header class="text-center mb-8 border-b-2 border-indigo-600 pb-6">
        <h1 class="text-4xl font-bold mb-3 text-gray-800">${resumeData.name || 'Professional Resume'}</h1>
        ${resumeData.headline ? `<p class="text-lg text-indigo-600 font-medium mb-4">${resumeData.headline}</p>` : ''}
        <div class="text-sm text-gray-600 space-y-2">
          <div class="flex justify-center items-center gap-6 flex-wrap">
            ${resumeData.phone ? `<span class="flex items-center gap-1"><span class="text-indigo-600">📞</span> ${resumeData.phone}</span>` : ''}
            ${resumeData.email ? `<span class="flex items-center gap-1"><span class="text-indigo-600">✉️</span> ${resumeData.email}</span>` : ''}
            ${resumeData.location ? `<span class="flex items-center gap-1"><span class="text-indigo-600">📍</span> ${resumeData.location}</span>` : ''}
          </div>
          <div class="flex justify-center items-center gap-6 flex-wrap">
            ${resumeData.linkedin ? `<span class="flex items-center gap-1"><span class="text-indigo-600">🔗</span> LinkedIn</span>` : ''}
            ${resumeData.portfolio ? `<span class="flex items-center gap-1"><span class="text-indigo-600">🌐</span> Portfolio</span>` : ''}
          </div>
        </div>
      </header>

      ${Object.keys(resumeData.skills).length > 0 ? `
      <!-- Skills -->
      <section class="mb-8">
        <h2 class="text-xl font-bold mb-4 border-b-2 border-indigo-400 pb-2 text-indigo-800 uppercase tracking-wide">Technical Skills</h2>
        <div class="grid grid-cols-1 gap-3">
          ${Object.entries(resumeData.skills).map(([category, skillList]) => `
            <div class="bg-gray-50 p-3 rounded-lg">
              <span class="font-semibold text-indigo-700">${category}:</span> 
              <span class="text-gray-700">${Array.isArray(skillList) ? skillList.join(', ') : skillList}</span>
            </div>
          `).join('')}
        </div>
      </section>
      ` : ''}

      ${resumeData.experience && resumeData.experience.length > 0 ? `
      <!-- Experience -->
      <section class="mb-8">
        <h2 class="text-xl font-bold mb-4 border-b-2 border-indigo-400 pb-2 text-indigo-800 uppercase tracking-wide">Professional Experience</h2>
        ${ensureArray(resumeData.experience).map(exp => `
          <div class="mb-6 bg-gray-50 p-4 rounded-lg">
            <div class="flex justify-between items-start mb-3">
              <div>
                <h3 class="font-bold text-lg text-gray-800">${exp.jobTitle || exp.position || 'Position'}</h3>
                <p class="text-indigo-600 font-semibold">${exp.companyName || exp.company || 'Company'}</p>
                ${exp.location ? `<p class="text-sm text-gray-600">${exp.location}</p>` : ''}
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-gray-700">${exp.startDate ? `${exp.startDate} - ${exp.isCurrent ? 'Present' : (exp.endDate || 'Present')}` : (exp.duration || '')}</p>
                ${exp.type ? `<p class="text-xs text-gray-500">${exp.type}</p>` : ''}
              </div>
            </div>
            ${exp.responsibilities ? `
              <div class="text-sm text-gray-700">
                <p class="leading-relaxed">${exp.responsibilities}</p>
              </div>
            ` : ''}
          </div>
        `).join('')}
      </section>
      ` : ''}

      ${resumeData.education && resumeData.education.length > 0 ? `
      <!-- Education -->
      <section class="mb-8">
        <h2 class="text-xl font-bold mb-4 border-b-2 border-indigo-400 pb-2 text-indigo-800 uppercase tracking-wide">Education</h2>
        ${ensureArray(resumeData.education).map(edu => `
          <div class="mb-4 bg-gray-50 p-4 rounded-lg">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-bold text-lg text-gray-800">${edu.degree || 'Degree'}</h3>
                <p class="text-indigo-600 font-semibold">${edu.institution || 'Institution'}</p>  
                ${edu.location ? `<p class="text-sm text-gray-600">${edu.location}</p>` : ''}
                ${edu.coursework ? `<p class="text-sm text-gray-600 mt-1"><span class="font-medium">Coursework:</span> ${edu.coursework}</p>` : ''}
                ${edu.honors ? `<p class="text-sm text-indigo-600 mt-1"><span class="font-medium">Honors:</span> ${edu.honors}</p>` : ''}
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-gray-700">${edu.startDate ? `${edu.startDate} - ${edu.endDate || 'Present'}` : (edu.duration || '')}</p>
                ${edu.gpa ? `<p class="text-sm font-bold text-indigo-600">GPA: ${edu.gpa}</p>` : ''}
                ${edu.grade ? `<p class="text-sm font-bold text-indigo-600">${edu.grade}</p>` : ''}
              </div>
            </div>
          </div>
        `).join('')}
      </section>
      ` : ''}

      <!-- Footer -->
      <footer class="text-center mt-12 pt-6 border-t border-gray-300">
        <p class="text-xs text-gray-500">Generated by ATS Resume Builder - Optimized for Applicant Tracking Systems</p>
      </footer>
    </div>
  `;
};

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