import React from "react";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import ThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import useMediaQuery from "@material-ui/core/useMediaQuery";
export const ThemeTypeContext = React.createContext(null);

const CustomThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = React.useState(false);

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          "*::-webkit-scrollbar": {
            width: "1rem",
          },
          "*::-webkit-scrollbar-track": {
            "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
            borderRadius: 10,
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.1)",
            borderRadius: 10,
          },
        },
      },
    },
  });

  function handleDarkModeToggle() {
    setDarkMode(!darkMode);
    localStorage.setItem("darkState", !darkMode);
  }

  React.useEffect(() => {
    const existingPreference = JSON.parse(localStorage.getItem("darkState"));
    // console.log("user wants dark mode?", JSON.parse(existingPreference));
    if (existingPreference) {
      setDarkMode(existingPreference);
    }
  }, []);

  return (
    <ThemeTypeContext.Provider value={{ handleDarkModeToggle, darkMode }}>
      <ThemeProvider theme={theme}>
        {children}
        <CssBaseline />
      </ThemeProvider>
    </ThemeTypeContext.Provider>
  );
};

export default CustomThemeProvider;
