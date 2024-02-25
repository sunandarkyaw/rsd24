import {
    Drawer, Box, Avatar, Typography,
    List, ListItem, ListItemButton, ListItemIcon, ListItemText
} from "@mui/material";
import { useUIState } from "../providers/UIStateProvider";
import { pink, blue, grey } from '@mui/material/colors';
import {
    PersonAdd as RegisterIcon,
    Person as ProfileIcon,
    Home as HomeIcon,
    Login as LoginIcon,
    Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

export default function AppDrawer() {
    const { openDrawer, setOpenDrawer } = useUIState();
    const navigate = useNavigate();
    const { auth, setAuth, authUser, setAuthUser } = useAuth();

    return <Drawer anchor="left" open={openDrawer}
        onClose={() => {
            setOpenDrawer(false);
        }}>
        <Box sx={{ width: 350 }}>
            <Box sx={{
                height: 250,
                bgcolor: 'banner.background',
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                p: 3,
            }}>
                {auth && (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{
                                width: 98,
                                height: 98,
                                background: pink[500],
                            }}>{authUser.name[0]}</Avatar>

                            <Box sx={{ ml: 3 }}>
                                <Typography sx={{ fontSize: 21, fontWeight: "bold", color: blue[500] }}>
                                    {authUser.name}</Typography>
                                <Typography sx={{ fontSize: 16, color: grey[600], mt: -1 }}>
                                    {authUser.handle}</Typography>
                            </Box>
                        </Box></>
                )}
            </Box>

            <List sx={{ px: 2 }}>
                {auth && (
                    <>
                        <ListItem>
                            <ListItemButton onClick={() => {
                                navigate("/");
                                setOpenDrawer(false);
                            }}>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ProfileIcon />
                                </ListItemIcon>
                                <ListItemText primary="Profile" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton onClick={() => {
                                setAuth(false);
                                setOpenDrawer(false);
                                setAuthUser({});
                                localStorage.removeItem("token");
                                navigate("/login");
                            }}>
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        </ListItem>
                    </>)}
                {!auth && (
                    <>
                        <ListItem>
                            <ListItemButton onClick={() => {
                                navigate("/register");
                                setOpenDrawer(false);
                            }}>
                                <ListItemIcon>
                                    <RegisterIcon />
                                </ListItemIcon>
                                <ListItemText primary="Register" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton onClick={() => {
                                navigate("/login");
                                setOpenDrawer(false);
                            }}>
                                <ListItemIcon>
                                    <LoginIcon />
                                </ListItemIcon>
                                <ListItemText primary="Login" />
                            </ListItemButton>
                        </ListItem></>
                )}

            </List>
        </Box>
    </Drawer>

}