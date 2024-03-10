import {
    DarkMode as DarkModeIcon,
    LightMode as LightModeIcon,
    Menu as MenuIcon,
    Notifications as NotiIcon,
    X as XIcon,
    ArrowBack as BackIcon,
    People as UsersIcon,
} from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, Toolbar } from "@mui/material";
import { useAppTheme } from "../providers/AppThemeProvider";
import { useUIState } from "../providers/UIStateProvider";
import { useLocation, useNavigate } from "react-router-dom";


export default function Header() {
    const { setOpenDrawer } = useUIState(true);
    const { mode, setMode } = useAppTheme();

    const { pathName } = useLocation();
    const navigate = useNavigate();

    return <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {pathName === "/" ? (
                <IconButton></IconButton>
            ) : (<IconButton></IconButton>)}
            <IconButton edge="start" color="inherit" onClick={() => {
                setOpenDrawer(true);
            }}>
                <MenuIcon />
            </IconButton>
            <XIcon />
            <Box>
                {mode == "dark" ?
                    (<IconButton color="inherit" onClick={() => {
                        setMode("light")
                    }}>
                        <LightModeIcon />
                    </IconButton>) :
                    (<IconButton color="inherit" onClick={() => {
                        setMode("dark")
                    }}>
                        <DarkModeIcon />
                    </IconButton>)}
                <IconButton color="inherit" edge="end">
                    <Badge badgeContent={1} color="error">
                        <NotiIcon />
                    </Badge>
                </IconButton>
            </Box>
        </Toolbar>
    </AppBar>
}
