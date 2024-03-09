import { Box, Typography, Card, CardContent, CardActionArea, IconButton, Button, ButtonGroup, Avatar } from "@mui/material";
import { MoreVert as MenuIcon, Comment as CommentIcon } from "@mui/icons-material";
import { blue, green, grey } from "@mui/material/colors";
import { format } from 'date-fns';
import { LikeButton } from "./LikeButton";

export function PostCard({ post, like, unlike }) {

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
                <IconButton><MenuIcon /></IconButton>
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