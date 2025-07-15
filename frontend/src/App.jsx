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
import Language from './pages/Language'
import WorkExperience from './pages/WorkExperience'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="signup" element={<SignUp />} />

        {/* Navbar Routes */}
        <Route path="/app" element={<Navbar />}>
          <Route path="upload" element={<UploadResume />} />
          <Route path="score" element={<ResumeScore />} />
          <Route path="improve" element={<ImproveResume />} />
        </Route>

        {/* Resume Builder Routes */}
        <Route path="/builder" element={<ResumeBuilderNavBar />}>
          <Route path="CertificatePage" element={<CertificatePage />} />
          <Route path="AddCertificatePage" element={<AddCertificatePage />} />
          <Route path="experience" element={<WorkExperience />} />
          <Route path="languages" element={<Language />} />
          <Route path="education" element={<Education />} />
          <Route path="personal" element={<PersonalInformation />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
