import React, { createContext, useContext, useState, useEffect } from 'react';

const SessionContext = createContext();

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

export const SessionProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Initialize session when component mounts
  useEffect(() => {
    initializeSession();
  }, []);

  const initializeSession = async () => {
    setLoading(true);
    try {
      // Check if session exists in localStorage
      let currentSessionId = localStorage.getItem('resume_session_id');
      
      if (!currentSessionId) {
        // Create new session
        const response = await fetch('http://localhost:5000/start-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        
        const data = await response.json();
        if (data.success) {
          currentSessionId = data.sessionId;
          localStorage.setItem('resume_session_id', currentSessionId);
        }
      }
      
      setSessionId(currentSessionId);
      console.log('📝 Session initialized:', currentSessionId);
    } catch (error) {
      console.error('❌ Error initializing session:', error);
    } finally {
      setLoading(false);
    }
  };

  const startNewSession = async () => {
    try {
      const response = await fetch('http://localhost:5000/start-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const data = await response.json();
      if (data.success) {
        setSessionId(data.sessionId);
        localStorage.setItem('resume_session_id', data.sessionId);
        console.log('🆕 New session started:', data.sessionId);
        return data.sessionId;
      }
    } catch (error) {
      console.error('❌ Error starting new session:', error);
    }
  };

  const clearSession = async () => {
    if (sessionId) {
      try {
        await fetch(`http://localhost:5000/session/${sessionId}`, {
          method: 'DELETE'
        });
        
        localStorage.removeItem('resume_session_id');
        setSessionId(null);
        console.log('🗑️ Session cleared');
      } catch (error) {
        console.error('❌ Error clearing session:', error);
      }
    }
  };

  const saveData = async (step, data) => {
    if (!sessionId) {
      throw new Error('No active session');
    }

    try {
      const response = await fetch('http://localhost:5000/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          step,
          data,
          sessionId
        })
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message);
      }

      return result;
    } catch (error) {
      console.error('❌ Error saving data:', error);
      throw error;
    }
  };

  return (
    <SessionContext.Provider value={{
      sessionId,
      loading,
      startNewSession,
      clearSession,
      saveData
    }}>
      {children}
    </SessionContext.Provider>
  );
};