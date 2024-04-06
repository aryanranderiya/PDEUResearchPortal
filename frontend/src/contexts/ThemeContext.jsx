import React from "react";

export const ThemeContext = React.createContext();

// Create a provider component
export const ThemeProvider = ({ children }) => {
  const [darkTheme, setStateDarkTheme] = React.useState(
    localStorage.getItem("darkTheme")
  );

  const setDarkTheme = (value) => {
    localStorage.setItem("darkTheme", value);
    setStateDarkTheme(value);
  };

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
