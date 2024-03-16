import { useEffect, useState } from "react";
import { List, ListItem, ListItemIcon, ListItemText, ListItemAvatar, Avatar, ListItemButton } from "@mui/material";
import { Comment as CommentIcon, Favorite as LikeIcon } from "@mui/icons-material";
import { format } from "date-fns";
import { useUIState } from "../providers/UIStateProvider";
import { useNavigate } from "react-router-dom";

export default function Notis() {
    const [notis, setNotis] = useState([]);
    const photo = import.meta.env.VITE_PROFILE_PHOTOS;
    const { setNotiCount } = useUIState();
    const api = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const res = await fetch(`${api}/notis`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setNotis(await res.json());
        })();
    }, []);

    const markRead = _id => {
        const result = notis.map(noti => {
            if (noti._id === _id) {
                noti.read = true;
            }
            return noti;
        });

        setNotis(result);
        setNotiCount(notis.filter(noti => !noti.read).length);
    }

    return <List>
        {
            notis.map(noti => {
                return (
                    <ListItem key={noti._id} sx={{ opacity: noti.read ? 0.5 : 1 }}>
                        <ListItemButton onClick={() => {
                            fetch(`${api}/notis/${noti._id}`, { method: 'PUT' });
                        }}>
                            <ListItemIcon>
                                {
                                    noti.type === "comment" ? (
                                        <CommentIcon color="success" />
                                    ) : (
                                        <LikeIcon color="error" />
                                    )
                                }
                            </ListItemIcon>
                            <ListItemAvatar>
                                <Avatar src={`${photo}/${noti.actor.profile}`} sx={{ width: 50, height: 50, mr: 2 }} />
                            </ListItemAvatar>
                            <ListItemText primary={`${noti.actor.name} ${noti.msg}`}
                                secondary={`${format(noti.created, "MMM d,y")}`} />
                        </ListItemButton>
                    </ListItem>
                )
            })
        }
    </List>
}