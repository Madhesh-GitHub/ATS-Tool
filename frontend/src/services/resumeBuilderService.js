export class ResumeBuilderService {
  constructor() {
    this.baseURL = 'http://localhost:5000';
  }

  // Get authentication token
  getAuthToken() {
    // Check both sessionStorage and localStorage
    let token = sessionStorage.getItem('token') || localStorage.getItem('token');
    
    // Also check for 'authToken' key (sometimes apps use different names)
    if (!token) {
      token = sessionStorage.getItem('authToken') || localStorage.getItem('authToken');
    }
    
    console.log('🔑 Token found:', token ? 'Yes' : 'No');
    return token;
  }

  // Save resume data with proper authentication
  async saveResumeData(step, data) {
    try {
      const token = this.getAuthToken();
      
      if (!token) {
        console.warn('⚠️ No authentication token found. Using anonymous session.');
      }
      
      console.log('📤 Sending request with token:', token ? 'Present' : 'Missing');
      
      const response = await fetch(`${this.baseURL}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })  // Only add if token exists
        },
        body: JSON.stringify({
          step: step,
          data: data
        })
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message);
      }

      console.log(`✅ ${step} data saved successfully`);
      console.log('📁 File info:', result.fileName);
      console.log('👤 User ID:', result.userId);
      
      return result;

    } catch (error) {
      console.error(`❌ Error saving ${step} data:`, error);
      throw error;
    }
  }

  // Start fresh session (clear all data)
  async startFreshSession() {
    try {
      const token = this.getAuthToken();
      
      const response = await fetch(`${this.baseURL}/start-fresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message);
      }

      console.log('✅ Fresh session started');
      return result;

    } catch (error) {
      console.error('❌ Error starting fresh session:', error);
      throw error;
    }
  }

  // Get existing user data
  async getUserData() {
    try {
      const token = this.getAuthToken();
      
      const response = await fetch(`${this.baseURL}/get-user-data`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message);
      }

      return result;

    } catch (error) {
      console.error('❌ Error getting user data:', error);
      throw error;
    }
  }

  // Generate resume from builder data
  async generateResumeFromBuilder(sessionId = null) {
    try {
      const token = this.getAuthToken();
      
      const response = await fetch(`${this.baseURL}/generate-resume-from-builder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          sessionId: sessionId
        })
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message);
      }

      console.log('✅ Resume generated successfully:', result);
      return result;

    } catch (error) {
      console.error('❌ Error generating resume:', error);
      throw error;
    }
  }

  // Helper to extract user ID from JWT token
  getUserIdFromToken(token) {
    if (!token) return 'anonymous';
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId;
    } catch {
      return 'anonymous';
    }
  }

  // Download methods (keep existing ones)
  downloadAsPDF(resumeHTML, fileName = 'resume') {
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${fileName}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 0; 
              padding: 20px; 
              background: white; 
            }
            @media print { 
              body { margin: 0; padding: 10px; } 
              @page { margin: 0.5in; }
            }
          </style>
        </head>
        <body>
          ${resumeHTML}
          <script>
            window.onload = function() {
              setTimeout(() => {
                window.print();
              }, 1000);
            }
          </script>
        </body>
      </html>
    `);
    
    printWindow.document.close();
  }

  downloadAsHTML(resumeHTML, fileName = 'resume') {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${fileName}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 0; 
              padding: 20px; 
              background: white; 
            }
          </style>
        </head>
        <body>
          ${resumeHTML}
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}