import { useRef } from "react";
import { Input, IconButton, Icon } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { add } from "../app/todoSlice";

export default function AddForm() {
    const inputRef = useRef();
    const dispatch = useDispatch();

    return (<form action="submit" onSubmit={e => {
        e.preventDefault();
        const name = inputRef.current.value;
        dispatch(add(name));
        inputRef.current.value = "";
        inputRef.current.focus();
    }}>
        <Input inputRef={inputRef} fullWidth endAdornment={
            <IconButton type="submit"><AddIcon /></IconButton>
        }></Input>
    </form>);
}