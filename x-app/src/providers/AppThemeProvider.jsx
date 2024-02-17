import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const mode = "light";
const theme = createTheme({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                background: 'purple',
            }
            : {
                background: 'deeppink'
            }),
    },
})

export default function AppThemeProvider({ children }) {
    return <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
}
