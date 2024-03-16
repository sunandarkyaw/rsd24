import { Comment as CommentIcon, Delete as DeleteIcon, MoreVert as MenuIcon } from "@mui/icons-material";
import { Avatar, Box, Button, ButtonGroup, Card, CardActionArea, CardContent, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from "@mui/material";
import { blue, green, grey } from "@mui/material/colors";
import { format } from 'date-fns';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LikeButton } from "./LikeButton";

export function PostCard({ post, like, unlike }) {
    const [showMenu, setShowMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState(null);
    const navigate = useNavigate();

    const photo = `${import.meta.env.VITE_PROFILE_PHOTOS}/${post.owner.profile}`;

    return (<Card sx={{ mb: 2 }}>
        <CardContent>
            <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <CardActionArea
                    onClick={() => {
                        navigate(`/profile/${post.owner._id}`);
                    }}
                    sx={{
                        display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 2
                    }}>
                    <Avatar sx={{ width: 75, height: 75, background: blue[500] }}>
                        <img src={photo}></img></Avatar>
                    <Box>
                        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                            <Typography>{post.owner.name}</Typography>-{" "}
                            <Typography sx={{ color: green[500], fontSize: 14 }}>- {format(post.created, "MMM d y")}</Typography>
                        </Box>
                        <Typography sx={{ color: grey[500], fontSize: 18 }}>{post.owner.handle}</Typography>
                    </Box>
                </CardActionArea>
                <Box>
                    <IconButton onClick={e => {
                        setShowMenu(true);
                        setMenuPosition(e.currentTarget);
                    }}>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={menuPosition}
                        open={showMenu}
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                        onClose={() => {
                            setShowMenu(false);
                        }}>
                        <MenuItem>
                            <ListItemIcon>
                                <DeleteIcon color="error" />
                            </ListItemIcon>
                            <ListItemText primary="Delete" />
                        </MenuItem>
                    </Menu>
                </Box>
            </Box>
            <CardActionArea onClick={() => {
                navigate(`/posts/${post._id}`);
            }}>
                <Typography sx={{ py: 2, px: 1 }}>
                    {post.body}
                </Typography>
            </CardActionArea>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <LikeButton post={post} like={like} unlike={unlike} />
                <ButtonGroup>
                    <IconButton><CommentIcon sx={{ color: blue[500] }} /></IconButton>
                    <Button variant="text">{post.comments ? post.comments.length : 0}</Button>
                </ButtonGroup>
            </Box>
        </CardContent>
    </Card>)
}