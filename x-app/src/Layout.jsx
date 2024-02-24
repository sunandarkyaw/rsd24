import { Box, Container } from "@mui/material";
import AppDrawer from "./componenets/AppDrawer";
import { Outlet } from "react-router-dom";
import Header from "./componenets/Header";

export default function Layout() {
    return (
        <Box>
            <AppDrawer />
            <Header />
            <Container maxWidth="sm">
                <Outlet />
            </Container>
        </Box>
    )
}