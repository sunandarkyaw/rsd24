import { Box, Typography, Card, CardContent, CardActionArea, IconButton, Button, ButtonGroup, Avatar, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { MoreVert as MenuIcon, Comment as CommentIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { blue, green, grey } from "@mui/material/colors";
import { format } from 'date-fns';
import { LikeButton } from "./LikeButton";
import { useState } from "react";

export function PostCard({ post, like, unlike }) {
    const [showMenu, setShowMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState(null);

    return (<Card sx={{ mb: 2 }}>
        <CardContent>
            <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <Avatar sx={{ width: 75, height: 75, background: blue[500] }}>{post.owner.name[0]}</Avatar>
                    <Box>
                        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                            <Typography>{post.owner.name}</Typography>-{" "}
                            <Typography sx={{ color: green[500], fontSize: 14 }}>- {format(post.created, "MMM d y")}</Typography>
                        </Box>
                        <Typography sx={{ color: grey[500], fontSize: 18 }}>{post.owner.handle}</Typography>
                    </Box>
                </Box>
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
            <CardActionArea>
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