import React, { useState, useEffect } from 'react';
import { Download, Loader2, AlertCircle, RefreshCw, FileText, Eye, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ResumeBuilderService } from '../services/resumeBuilderService';

export default function ResumePreview() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [resumeHTML, setResumeHTML] = useState('');
  const [resumeData, setResumeData] = useState(null);
  const [generationId, setGenerationId] = useState(null);
  const [sourceFile, setSourceFile] = useState('');
  
  const resumeService = new ResumeBuilderService();

  useEffect(() => {
    generateResumePreview();
  }, []);

  const generateResumePreview = async () => {
    setLoading(true);
    setError('');

    try {
      console.log('🎯 Starting resume generation from builder data...');
      
      // Generate resume using our new service
      const result = await resumeService.generateResumeFromBuilder();
      
      console.log('✅ Resume generation successful:', result);
      
      setResumeHTML(result.html);
      setResumeData(result.data);
      setGenerationId(result.generationId);
      setSourceFile(result.sourceFile);
      
    } catch (err) {
      console.error('❌ Error generating preview:', err);
      setError(err.message || 'Failed to generate resume preview');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!resumeHTML || !resumeData) {
      alert('Resume not ready for download');
      return;
    }

    const fileName = `resume_${resumeData.name ? resumeData.name.replace(/\s+/g, '_') : 'ATS_Resume'}`;
    resumeService.downloadAsPDF(resumeHTML, fileName);
  };

  const handleDownloadHTML = () => {
    if (!resumeHTML || !resumeData) {
      alert('Resume not ready for download');
      return;
    }

    const fileName = `resume_${resumeData.name ? resumeData.name.replace(/\s+/g, '_') : 'ATS_Resume'}`;
    resumeService.downloadAsHTML(resumeHTML, fileName);
  };

  const handleBackToBuilder = () => {
    navigate('/builder/personal');
  };

  const handleEditResume = () => {
    navigate('/builder/personal');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <Loader2 className="w-16 h-16 animate-spin mx-auto mb-6 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Generating Your ATS Resume</h2>
          <p className="text-gray-600 mb-2">Processing your resume builder data...</p>
          <p className="text-sm text-gray-500">Converting to ATS-friendly format</p>
          <div className="mt-4 bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-indigo-600 h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Generation Failed</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={generateResumePreview}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
            <button
              onClick={handleBackToBuilder}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Builder
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Eye className="w-8 h-8 text-indigo-600" />
                Resume Preview
              </h1>
              <p className="text-gray-600 mt-2">
                Your ATS-optimized resume is ready! Review and download when satisfied.
              </p>
            </div>
            <button
              onClick={handleBackToBuilder}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Builder
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Action Buttons */}
        <div className="text-center mb-8">
          <div className="inline-flex gap-4 bg-white p-4 rounded-xl shadow-lg">
            <button
              onClick={handleDownloadPDF}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all transform hover:scale-105"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </button>
            <button
              onClick={handleDownloadHTML}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all transform hover:scale-105"
            >
              <FileText className="w-5 h-5" />
              Download HTML
            </button>
            <button
              onClick={handleEditResume}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all transform hover:scale-105"
            >
              <RefreshCw className="w-5 h-5" />
              Edit Resume
            </button>
            <button
              onClick={generateResumePreview}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all transform hover:scale-105"
            >
              <RefreshCw className="w-5 h-5" />
              Regenerate
            </button>
          </div>
          
          {/* Status Info */}
          <div className="mt-4 text-sm text-gray-600">
            <div className="flex justify-center items-center gap-4 flex-wrap">
              {sourceFile && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  Source: {sourceFile}
                </span>
              )}
              {generationId && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  Generated: {generationId}
                </span>
              )}
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                ✅ ATS Optimized
              </span>
            </div>
          </div>
        </div>

        {/* Resume Preview */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Preview Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6" />
                <div>
                  <h3 className="font-bold text-lg">ATS-Friendly Resume</h3>
                  <p className="text-indigo-100 text-sm">Optimized for Applicant Tracking Systems</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-indigo-100 text-sm">Ready for Download</p>
                <p className="text-white font-semibold">✅ Formatted & Optimized</p>
              </div>
            </div>
          </div>

          {/* Resume Content */}
          <div className="p-8 bg-white">
            <div 
              id="resume-preview-content" 
              dangerouslySetInnerHTML={{ __html: resumeHTML }}
              className="prose prose-lg max-w-none"
            />
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-indigo-800 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6" />
            ATS Optimization Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-green-700 mb-2">✅ Keywords Optimized</h4>
              <p className="text-gray-600">Your resume includes relevant industry keywords</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-green-700 mb-2">✅ Clean Formatting</h4>
              <p className="text-gray-600">ATS-friendly structure and layout</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-green-700 mb-2">✅ Standard Sections</h4>
              <p className="text-gray-600">Properly organized resume sections</p>
            </div>
          </div>
        </div>

        {/* Debug Info (Development Only) */}
        {process.env.NODE_ENV === 'development' && resumeData && (
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <details>
              <summary className="cursor-pointer font-medium text-yellow-800 flex items-center gap-2">
                <span>🔧 Debug Information</span>
              </summary>
              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="font-semibold text-yellow-700">Resume Data:</h4>
                  <pre className="text-xs bg-yellow-100 p-2 rounded overflow-auto max-h-64 mt-2">
                    {JSON.stringify(resumeData, null, 2)}
                  </pre>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-700">Generation Info:</h4>
                  <div className="text-sm text-yellow-800 space-y-1">
                    <p><strong>Generation ID:</strong> {generationId}</p>
                    <p><strong>Source File:</strong> {sourceFile}</p>
                    <p><strong>HTML Length:</strong> {resumeHTML?.length} characters</p>
                  </div>
                </div>
              </div>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}