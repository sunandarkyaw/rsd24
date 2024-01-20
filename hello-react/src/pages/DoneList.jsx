import { List, ListItem, ListItemText, ListItemIcon, IconButton } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon, Check as CheckIcon } from "@mui/icons-material";

export default function DoneList({ list, remove, toggle }) {
    return (
        <List>
            {list.map(item => {
                return (<ListItem
                    key={item._id}
                    secondaryAction={
                        <>
                            <IconButton>
                                <EditIcon color="info" />
                            </IconButton>
                            <IconButton onClick={() => {
                                remove(item._id)
                            }}>
                                <DeleteIcon color="error" />
                            </IconButton>
                        </>
                    }>
                    <ListItemIcon>
                        <IconButton>
                            <CheckIcon color="success"></CheckIcon>
                        </IconButton>
                    </ListItemIcon>
                    <ListItemText primary={item.subject} />
                </ListItem>
                );
            })}
        </List>
    );
}