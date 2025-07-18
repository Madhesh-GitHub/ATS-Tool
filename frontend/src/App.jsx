import React from 'react'
import { Routes, Route } from "react-router"
import LandingPage from "./pages/LandingPage"
import Navbar from './Nav/Navbar'
import UploadResume from './pages/UploadResume'
import ImproveResume from './pages/ImproveResume'
import ResumeScore from './pages/ResumeScore'
import ResumeBuilderNavBar from './Resume Builder Nav/ResumeBuilderNavBar'
import CertificatePage from './pages/DeepikaA/CertificatePage'
import AddCertificatePage from './pages/DeepikaA/AddCertificatePage'
import SignUp from './pages/SignUp'
import Skills from './pages/Skills'
import Language from './pages/Language'
import WorkExperience from './pages/WorkExperience'
import LostPage from "./pages/LostPage"
import ResumePreview from "./pages/ResumePreview"
import Achievements from "./pages/Achievements"
import Settings from "./pages/Settings"
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import PersonalInformation from './pages/PersonalInformation'
import Education from './pages/Education'
import { Navigate } from "react-router-dom";


const App = () => {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<LostPage />} />

        {/* Navbar Routes */}
        <Route path="/app" element={<Navbar />}>
        <Route index element={<Navigate to="/app/upload" />} /> 
          <Route path="upload" element={<Dashboard />} />
          <Route path="score" element={<ResumeScore />} />
          <Route path="improve" element={<ImproveResume />} />
        </Route>

        {/* Resume Builder Routes */}
        <Route path="/builder" element={<ResumeBuilderNavBar />}>
          <Route path="education" element={<Education />} />
          <Route path="personal" element={<PersonalInformation />} />
          <Route path="CertificatePage" element={<CertificatePage />} />
          <Route path="AddCertificatePage" element={<AddCertificatePage />} />
          <Route path="experience" element={<WorkExperience />} />
          <Route path="languages" element={<Language />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="settings" element={<Settings />} />
          <Route path="resume-preview" element={<ResumePreview />} />
          <Route path="skills" element={<Skills/>} />


        </Route>
      </Routes>
    </>
  )
}

export default App
