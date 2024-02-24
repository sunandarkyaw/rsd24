import { Box, TextField, Typography, Button } from "@mui/material";
import { useRef } from "react";

export default function Login() {

    const handleRef = useRef();
    const passwordRef = useRef();

    return <Box sx={{ mt: 2 }}>
        <Typography variant="h4">
            Login
        </Typography>
        <Box sx={{ mt: 4 }}>
            <form onSubmit={e => { e.preventDefault(); }}>
                <TextField inputRef={handleRef} label="UserName" variant="outlined" sx={{ mb: 2 }} fullWidth />
                <TextField inputRef={passwordRef} sx={{ mb: 2 }} label="Password" type="password" variant="outlined" fullWidth />
                <Button type="submit" variant="contained" fullWidth>Login</Button>
            </form>
        </Box>
    </Box>;
}