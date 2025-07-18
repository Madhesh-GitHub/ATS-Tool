import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { COLORS } from "../styles/colors";
import "./Dashboard.css";

export default function Dashboard() {
  // UploadResume logic
  const fileInput = useRef();
  const [fileName, setFileName] = useState("");
  const [jobDesc, setJobDesc] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files[0]) setFileName(e.target.files[0].name);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files[0]) setFileName(e.dataTransfer.files[0].name);
  };

  const handleBrowse = () => fileInput.current.click();

  const handleAnalyze = (e) => {
    e.preventDefault();
    alert(`Resume: ${fileName || "No file"}\nJob Description: ${jobDesc || "None"}`);
  };

  return (
    <motion.div
      className="dashboard-root"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="dashboard-main">
        <motion.div
          className="dashboard-content"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7, type: "spring" }}
        >
          {/* UploadResume */}
          <section className="upload-section">
            <h2 style={{ color: COLORS.primary }}>Upload Your Resume</h2>
            <form className="upload-form" onSubmit={handleAnalyze}>
              <div
                className="upload-dropzone"
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}
                style={{ borderColor: COLORS.primary }}
              >
                <div>
                  <span style={{ fontSize: 32, color: COLORS.primary }}>⬆️</span>
                  <div style={{ color: COLORS.textMuted, margin: "8px 0" }}>
                    Drag and drop your resume here
                  </div>
                  <div style={{ color: COLORS.textMuted, fontSize: 13 }}>
                    Supported formats: PDF, DOCX
                  </div>
                  <div style={{ margin: "12px 0" }}>or</div>
                  <button
                    type="button"
                    className="upload-browse"
                    style={{ borderColor: COLORS.secondary, color: COLORS.secondary }}
                    onClick={handleBrowse}
                  >
                    Browse Files
                  </button>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    ref={fileInput}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  {fileName && <div className="upload-filename">{fileName}</div>}
                </div>
              </div>
              <textarea
                className="upload-jobdesc"
                placeholder="Paste the job description here..."
                value={jobDesc}
                onChange={e => setJobDesc(e.target.value)}
                style={{ borderColor: COLORS.primary, color: COLORS.textPrimary }}
              />
              <button
                type="submit"
                className="upload-analyze"
                style={{ background: COLORS.primary }}
              >
                Analyze Resume
              </button>
            </form>
          </section>

          {/* InfoCards */}
          <div className="info-cards">
            <div className="info-card">
              <h4 style={{ color: COLORS.primary }}>What We'll Check</h4>
              <ul>
                <li>ATS compatibility and parsing accuracy</li>
                <li>Industry-specific keywords and phrases</li>
                <li>Formatting and structure optimization</li>
                <li>Skills matching with job requirements</li>
                <li>Experience and education relevance</li>
              </ul>
            </div>
            <div className="info-card">
              <h4 style={{ color: COLORS.primary }}>Tips for Better Results</h4>
              <ul>
                <li>Use a clean, simple format without tables or columns</li>
                <li>Include relevant keywords from the job description</li>
                <li>Quantify achievements with numbers when possible</li>
                <li>Ensure contact information is at the top</li>
                <li>Use standard section headings (Experience, Education)</li>
              </ul>
            </div>
          </div>

          {/* HowItWorks */}
          <div className="howitworks-card">
            <h4 style={{ color: COLORS.primary }}>How It Works</h4>
            <div className="howitworks-steps">
              <div>
                <div className="howitworks-icon">🆙</div>
                <div className="howitworks-title">1. Upload</div>
                <div className="howitworks-desc">Upload your resume in PDF or DOCX format</div>
              </div>
              <div>
                <div className="howitworks-icon">🤖</div>
                <div className="howitworks-title">2. Analyze</div>
                <div className="howitworks-desc">Our AI analyzes your resume against ATS criteria</div>
              </div>
              <div>
                <div className="howitworks-icon">📈</div>
                <div className="howitworks-title">3. Results</div>
                <div className="howitworks-desc">Get detailed feedback and improvement suggestions</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}