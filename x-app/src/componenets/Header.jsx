import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import {
    Menu as MenuIcon, X as XIcon, Notifications as NotiIcon,
    LightMode as LightModeIcon, DarkMode as DarkModeIcon
} from "@mui/icons-material";
import { useUIState } from "../providers/UIStateProvider";


export default function Header() {
    const { setOpenDrawer } = useUIState(true);

    return <AppBar position="static" sx={{ bgcolor: "background" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton edge="start" color="inherit" onClick={() => {
                setOpenDrawer(true);
            }}>
                <MenuIcon />
            </IconButton>
            <XIcon />
            <Box>
                <IconButton color="inherit">
                    <DarkModeIcon />
                </IconButton>
                <IconButton color="inherit" edge="end">
                    <NotiIcon />
                </IconButton>
            </Box>
        </Toolbar>
    </AppBar>
}
