import { Box, TextField, Typography, Button, Alert } from "@mui/material";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {

    const handleRef = useRef();
    const passwordRef = useRef();
    const [hasError, sethasError] = useState(false);

    return <Box sx={{ mt: 2 }}>
        <Typography variant="h4">
            Login
        </Typography>
        <Box sx={{ mt: 4 }}>
            <form onSubmit={e => {
                e.preventDefault();
                if (!handleRef.current.value || !passwordRef.current.value) {
                    sethasError(true);
                }
                else {
                    sethasError(false);
                }
                return false;
            }}>
                {hasError && (
                    <Alert severity="warning" sx={{ mb: 4 }}>
                        handle or password required
                    </Alert>
                )}
                <TextField inputRef={handleRef} label="UserName" variant="outlined" sx={{ mb: 2 }} fullWidth />
                <TextField inputRef={passwordRef} sx={{ mb: 2 }} label="Password" type="password" variant="outlined" fullWidth />

                <Button type="submit" variant="contained" fullWidth>Login</Button>
            </form>
            <Box sx={{ mt: 2, textAlign: 'center' }}><Link to="/register">Register</Link></Box>
        </Box>
    </Box>;
}