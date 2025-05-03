import React, { createContext, useMemo, useState } from "react"
import { darkTheme, lightTheme } from "../components/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
export const  themeContext = createContext();

const CustomThemeProvider = ({children}) => {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => {
        setIsDark(!isDark);
    }

    const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark])
  return (
    <div className="bg-"> 
   <themeContext.Provider value={{isDark, toggleTheme}}>
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        { children }
    </ThemeProvider>
   </themeContext.Provider>
   </div>
  )
};

export default CustomThemeProvider;

