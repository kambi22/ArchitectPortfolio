import axios from "axios";
import React, { createContext, useEffect, useState } from "react"



export const LogContext = createContext();
const LoginContext = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);


  console.log('is authenticated:',isAuthenticated)

  const accessProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/profile`, {
        withCredentials: true
      });
      console.log('profile:',response)
      console.log('profile:',response.data.authenticated)
    
        setIsAuthenticated(response.data.authenticated);
      
    } catch (error) {
      setIsAuthenticated(false);
      
    } finally {
      setLoading(false);
    }
  };


  

  useEffect(() => {
    accessProfile();
  }, []);

  return (
    <LogContext.Provider value={{ 
      isAuthenticated, 
      setIsAuthenticated,
      loading,
      refreshAuth: accessProfile
    }}>
      {children}
    </LogContext.Provider>
  );
};

export default LoginContext;
