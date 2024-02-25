import { TextField, Typography, Box, Button, Alert } from "@mui/material";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {

    const pwdRef = useRef();
    const confirmPwdRef = useRef();
    const [pwdCheck, setPwdCheck] = useState(false);
    const [hasError, sethasError] = useState(false);
    const [errorMsg, seterrorMsg] = useState('');

    const nameRef = useRef();
    const handleRef = useRef();
    const profileRef = useRef();
    const navigate = useNavigate();

    const api = import.meta.env.VITE_API_URL;

    return <Box sx={{ mt: 2 }}>
        <Typography variant="h4">
            Register
        </Typography>
        <Box sx={{ mt: 4 }}>
            <form onSubmit={e => {
                e.preventDefault();
                const name = nameRef.current.value;
                const handle = handleRef.current.value;
                const password = pwdRef.current.value;
                const confirmPwd = confirmPwdRef.current.value;

                if (!name || !handle || !password || !confirmPwd) {
                    sethasError(true);
                    seterrorMsg('Form fill is not completed');
                }
                else {
                    sethasError(false);

                    const profile = profileRef.current.value;
                    fetch(`${api}/register`, {
                        method: 'post',
                        body: JSON.stringify({ name, handle, password, profile }),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                        .then(res => res.json())
                        .then(user => {
                            navigate("/login");
                        })
                        .catch(err => {
                            sethasError(true);
                            seterrorMsg('Something went wrong');
                            console.log(err);
                        });
                }
                return false;
            }}>
                {hasError && <Alert severity="warning" sx={{ mb: 4 }}>{errorMsg}</Alert>}
                <TextField inputRef={nameRef} label="Name" variant="outlined" sx={{ mb: 2 }} fullWidth></TextField>
                <TextField inputRef={handleRef} label="Handle" variant="outlined" sx={{ mb: 2 }} fullWidth></TextField>
                <TextField inputRef={profileRef} label="Profile/bio" variant="outlined" sx={{ mb: 2 }} fullWidth></TextField>
                <TextField inputRef={pwdRef} label="Password" type="password" variant="outlined" sx={{ mb: 2 }} fullWidth></TextField>
                <TextField inputRef={confirmPwdRef} label="Confirm Password" type="password" variant="outlined" sx={{ mb: 2 }} fullWidth
                    onChange={() => {
                        if (pwdRef.current.value && (confirmPwdRef.current.value != pwdRef.current.value)) {
                            setPwdCheck(true);
                        } else {
                            setPwdCheck(false);
                        }
                    }}></TextField>
                {pwdCheck && (
                    <Alert severity="warning" sx={{ mt: 4 }}>Password and Confirm Password does not match</Alert>
                )}
                <Button type="submit" variant="contained" fullWidth>Register</Button>
            </form>
            <Box sx={{ mt: 2, textAlign: 'center' }}><Link to="/login">Login</Link></Box>
        </Box>
    </Box>
}