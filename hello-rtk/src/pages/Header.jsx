import { useContext } from "react";
import { ThemeContex } from "../themes/Theme";
import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import {
    Checklist as ChecklistIcon, ClearAll as ClearAllIcon,
    LightMode as LightModeIcon, DarkMode as DarkModeIcon
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { clear } from "../app/todoSlice";

export default function Header() {//{} mean object destructure
    const { mode, setMode } = useContext(ThemeContex);
    const list = useSelector(state => state.todo.items);
    const dispatch = useDispatch();

    return (
        <AppBar position="static">
            <Toolbar>
                <Badge badgeContent={list.filter(item => !item.done).length} color="error">
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
                <IconButton onClick={() => { dispatch(clear()); }}> <ClearAllIcon color="inherit" /> </IconButton>
            </Toolbar>
        </AppBar>);
}