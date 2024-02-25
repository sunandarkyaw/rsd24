import { Box, TextField, Typography, Button, Alert } from "@mui/material";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

export default function Login() {

    const handleRef = useRef();
    const passwordRef = useRef();
    const [hasError, sethasError] = useState(false);
    const { auth, setAuth, authUser, setAuthUser } = useAuth();
    const [errormessage, seterrormessage] = useState('');
    const navigate = useNavigate();

    const api = import.meta.env.VITE_API_URL;

    const loginUser = async (subject) => {
        if (!subject) return false;

        const res = await fetch(`${api}/login`, {
            method: 'post',
            body: JSON.stringify(subject),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.ok) {
            const data = await res.json();
            localStorage.setItem("token", data.token);

            fetch(`${api}/verify`, {
                method: 'get',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            })
                .then(res => res.json())
                .then(user => {
                    setAuth(true);
                    setAuthUser(user);
                    navigate("/");
                });
        }
        else {
            sethasError(true);
            seterrormessage('invalid handle or password');
        }
    }

    return <Box sx={{ mt: 2 }}>
        <Typography variant="h4">
            Login
        </Typography>
        <Box sx={{ mt: 4 }}>
            <form onSubmit={async e => {
                e.preventDefault();
                const handle = handleRef.current.value;
                const password = passwordRef.current.value;
                if (!handle || !password) {
                    sethasError(true);
                    seterrormessage('handle or password required');
                }
                else {
                    sethasError(false);
                    await loginUser({
                        handle, password
                    })
                }
                return false;
            }}>
                {hasError && (
                    <Alert severity="warning" sx={{ mb: 4 }}>
                        {errormessage}
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