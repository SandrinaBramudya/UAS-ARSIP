import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Buat provider sederhana dulu untuk testing
const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = React.useState(true);
  
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  return React.cloneElement(children, { 
    darkMode, 
    setDarkMode 
  });
};

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = React.useState('id');
  
  return React.cloneElement(children, { 
    language, 
    setLanguage 
  });
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);