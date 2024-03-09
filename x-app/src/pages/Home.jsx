import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { PostCard } from "../componenets/PostCard";

export default function Home() {

    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const api = import.meta.env.VITE_API_URL;

    const { authUser } = useAuth();
    
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
            const res = await fetch(`${api}/posts`);
            const data = await res.json();

            setPosts(data);
            setIsLoading(false);
        })();
    }, []);

    return (
        <Box>
            {isLoading ? (<Box>Loading...</Box>) : (
                posts.map(item => <PostCard post={item} key={item._id} like={like} unlike={unlike} />)
            )}
        </Box>
    )
}