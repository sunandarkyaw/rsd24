import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import { Checklist as ChecklistIcon, ClearAll as ClearAllIcon } from "@mui/icons-material";

export default function Header({ count, clear }) {//{} mean object destructure
    return (
        <AppBar position="static">
            <Toolbar>
                <Badge badgeContent={count} color="error">
                    <ChecklistIcon />
                </Badge>
                <Typography variant="h6" sx={{ ml: 2, flexGrow: 1 }}>
                    CheckList
                </Typography>
                <IconButton onClick={clear}> <ClearAllIcon color="inherit" /> </IconButton>
            </Toolbar>
        </AppBar>);
}