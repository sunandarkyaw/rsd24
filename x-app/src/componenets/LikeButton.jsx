import { IconButton, Button, ButtonGroup } from "@mui/material";
import { FavoriteBorder as LikeIcon, Favorite as LikedIcon } from "@mui/icons-material";
import { pink } from "@mui/material/colors";
import { useAuth } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

export function LikeButton({ post, like, unlike }) {
    const { auth, authUser } = useAuth();
    const api = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    return (<ButtonGroup>
        {auth && post.likes ? (
            post.likes.find(
                like => like === authUser._id
            ) ? (
                <IconButton onClick={async () => {
                    await fetch(`${api}/posts/unlike/${post._id}`, {
                        method: 'PUT',
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    unlike(post._id);
                }}>
                    <LikedIcon sx={{ color: pink[500] }} />
                </IconButton>
            ) : (
                <IconButton onClick={async () => {
                    await fetch(`${api}/posts/like/${post._id}`, {
                        method: 'PUT',
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    like(post._id)
                }}>
                    <LikeIcon sx={{ color: pink[500] }} />
                </IconButton>
            )
        ) : (
            <IconButton>
                <LikeIcon sx={{ color: pink[500] }} />
            </IconButton>
        )}
        <Button variant="text" onClick={() => {
            navigate("/");
        }}>{post.likes ? post.likes.length : 0}</Button>
    </ButtonGroup>);
}