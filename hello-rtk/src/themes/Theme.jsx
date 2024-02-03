import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import AppRouter from "../pages/AppRouter";
import { createContext, useMemo, useState } from "react";

export const ThemeContex = createContext();

export default function Theme() {
    const [mode, setMode] = useState("dark");

    const theme = useMemo(() => {
        return createTheme({
            palette: {
                mode,
            }
        });
    }, [mode]);
    return <ThemeContex.Provider value={{ mode, setMode }}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppRouter />
        </ThemeProvider>
    </ThemeContex.Provider>
}