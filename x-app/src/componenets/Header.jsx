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
import { useEffect } from "react";
import { useAuth } from "../providers/AuthProvider";


export default function Header() {
    const { setOpenDrawer, notiCount, setNotiCount } = useUIState(true);
    const { mode, setMode } = useAppTheme();
    const auth = useAuth();

    const pathName = useLocation();
    const navigate = useNavigate();
    const api = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");

    useEffect(() => {
        (async () => {
            const res = await fetch(`${api}/notis`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(auth);
            const notis = await res.json();
            const count = auth.auth ? notis.filter(noti => !noti.read).length : 0;
            
            setNotiCount(count);
        })();
    }, [auth, notiCount]);

    return <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {(pathName && pathName.pathname === "/") ? (
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={() => {
                        setOpenDrawer(true);
                    }}>
                    <MenuIcon />
                </IconButton>
            ) : (
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={() => {
                        navigate(-1);
                    }}>
                    <BackIcon />
                </IconButton>
            )}
            <IconButton
                color="inherit"
                onClick={() => {
                    navigate("/");
                }}>
                <XIcon />
            </IconButton>
            <Box>
                <IconButton
                    color="inherit" sx={{ mr: 1 }}>
                    <UsersIcon />
                </IconButton>
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
                <IconButton
                    color="inherit"
                    edge="end"
                    onClick={() => {
                        navigate("/notis");
                    }}>
                    <Badge badgeContent={notiCount} color="error">
                        <NotiIcon />
                    </Badge>
                </IconButton>
            </Box>
        </Toolbar>
    </AppBar>
}
