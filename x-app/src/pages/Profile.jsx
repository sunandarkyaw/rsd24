import { Avatar, Box, Button } from "@mui/material";
import { blue, pink } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { PostCard } from "../componenets/PostCard";
import { useAuth } from "../providers/AuthProvider";
import { useParams } from "react-router-dom";

export default function Profile() {

    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [photo, setPhoto] = useState("");
    const [cover, setCover] = useState("");
    const api = import.meta.env.VITE_API_URL;

    const { authUser } = useAuth();
    const { id } = useParams();

    const like = _id => {
        const result = posts.map(post => {
            if (post._id === _id) {
                post.likes.push(authUser._id);
            }
            return post;
        });

        setPosts(result);
    };

    const unlike = _id => {
        const result = posts.map(post => {
            if (post._id == _id) {
                post.likes = post.likes.filter(like => like !== authUser._id);
            }
            return post;
        });

        setPosts(result);
    };

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const res = await fetch(`${api}/posts/profile/${id}`);
            const data = await res.json();

            setPosts(data);
            setIsLoading(false);
        })();
    }, []);

    const getFile = async () => {
        const [fileHandle] = await window.showOpenFilePicker({
            types: [
                {
                    description: "Images",
                    accept: {
                        "image/*": [".png", ".jpeg", ".jpg"]
                    },
                },
            ],
            excludeAcceptAllOption: true,
            multiple: false,
        });
        return await fileHandle.getFile();
    };

    const changePhoto = async e => {
        const file = await getFile();
        setPhoto(URL.createObjectURL(file));
    }

    const changeCover = async e => {
        const file = await getFile();
        setCover(URL.createObjectURL(file));
    }

    return (
        <Box>
            <Box sx={{
                background: blue[500],
                height: 200,
                borderRadius: 5,
                cursor: "pointer",
                overflow: "hidden"
            }} onClick={async () => {
                changeCover();
            }}>
                <img src={cover} width="100%" alt="" />
            </Box>
            <Box sx={{
                marginTop: "-64px",
                marginBottom: "40px",
                textAlign: "center"
            }}>
                <Button onClick={async () => {
                    changePhoto();
                }}>
                    <Avatar src={photo} sx={{ width: 128, height: 128, background: pink[500] }}>
                        {authUser.name[0]}</Avatar>
                </Button>
            </Box>

            {isLoading ? (<Box>Loading...</Box>) : (
                posts.map(item => <PostCard post={item} key={item._id} like={like} unlike={unlike} />)
            )}
        </Box>
    )
}