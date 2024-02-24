import { TextField, Typography, Box, Button, Alert } from "@mui/material";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {

    const pwdRef = useRef();
    const confirmPwdRef = useRef();
    const [pwdCheck, setPwdCheck] = useState(false);
    const [hasError, sethasError] = useState(false);

    const nameRef = useRef();
    const handleRef = useRef();

    return <Box sx={{ mt: 2 }}>
        <Typography variant="h4">
            Register
        </Typography>
        <Box sx={{ mt: 4 }}>
            <form onSubmit={e => {
                e.preventDefault();
                const name = nameRef.current.value;
                const handle = handleRef.current.value;
                const pwd = pwdRef.current.value;
                const confirmPwd = confirmPwdRef.current.value;
                if (!name || !handle || !pwd || !confirmPwd) {
                    sethasError(true);
                }
                else {
                    sethasError(false);
                }
                return false;
            }}>
                {hasError && <Alert severity="warning" sx={{ mb: 4 }}>Form fill is not completed</Alert>}
                <TextField inputRef={nameRef} label="Name" variant="outlined" sx={{ mb: 2 }} fullWidth></TextField>
                <TextField inputRef={handleRef} label="Handle" variant="outlined" sx={{ mb: 2 }} fullWidth></TextField>
                <TextField label="Profile/bio" variant="outlined" sx={{ mb: 2 }} fullWidth></TextField>
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