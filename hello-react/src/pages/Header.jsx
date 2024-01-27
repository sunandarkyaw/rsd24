import { useContext } from "react";
import { ThemeContex } from "../themes/Theme";
import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import {
    Checklist as ChecklistIcon, ClearAll as ClearAllIcon,
    LightMode as LightModeIcon, DarkMode as DarkModeIcon
} from "@mui/icons-material";

export default function Header({ count, clear }) {//{} mean object destructure
    const { mode, setMode } = useContext(ThemeContex);

    return (
        <AppBar position="static">
            <Toolbar>
                <Badge badgeContent={count} color="error">
                    <ChecklistIcon />
                </Badge>
                <Typography variant="h6" sx={{ ml: 2, flexGrow: 1 }}>
                    CheckList
                </Typography>
                {
                    mode == "dark" ? <IconButton onClick={() => {
                        setMode("light");
                    }}> <LightModeIcon color="inherit" /> </IconButton> :
                        <IconButton onClick={() => {
                            setMode("dark");
                        }}> <DarkModeIcon color="inherit" /> </IconButton>
                }
                <IconButton onClick={clear}> <ClearAllIcon color="inherit" /> </IconButton>
            </Toolbar>
        </AppBar>);
}