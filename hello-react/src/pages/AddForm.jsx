import { useRef } from "react";
import { Input, IconButton, Icon } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

export default function AddForm({ add }) {
    const inputRef = useRef();

    return (<form action="submit" onSubmit={e => {
        e.preventDefault();
        const name = inputRef.current.value;
        add(name);
        inputRef.current.value = "";
        inputRef.current.focus();
    }}>
        <Input inputRef={inputRef} fullWidth endAdornment={
            <IconButton type="submit"><AddIcon /></IconButton>
        }></Input>
    </form>);
}