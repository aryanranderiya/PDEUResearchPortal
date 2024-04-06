import * as React from "react";

export const AuthContext = React.createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const setAuthenticated = (value) => {
    localStorage.setItem("isAuthenticated", value);
    setIsAuthenticated(value);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
